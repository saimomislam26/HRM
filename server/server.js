const mysql = require('mysql');
const app = require('./app');
var busboy = require('connect-busboy');
app.use(busboy());
const csvtojson = require('csvtojson');
const nodemailer = require('nodemailer')
const { body, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const cors = require('cors');
app.use(cors());

app.use(fileUpload());
var db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "pass1234",
    database: "hrm_db"
})

db.connect(function (err) {
    if (err) return console.log(err)
    console.log("database Connected Successfully");
})
app.listen(5000, () => {
    console.log(`app is listening on port 5000...`)
})

// For CSV Email Validation
function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}


app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.files.file;

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err });
        }

    });

    const fileName = `${__dirname}/uploads/${file.name}`;
    console.log(fileName)
    var count = 0;
    var reject = 0;
    csvtojson().fromFile(fileName).then(source => {

        for (var i = 0; i < source.length; i++) {
            var firstname = source[i]["firstname"],
                lastname = source[i]["lastname"],
                email = source[i]["email"]

            var insertStatement = `INSERT INTO employee (firstname,lastname,email) values(?, ?, ?)`

            var items = [firstname, lastname, email];
            if (firstname == "" || lastname == "" || email == "") {
                reject = reject + 1;
                continue;
            }
            else if (validateEmail(email) == false) {
                reject = reject + 1;
                continue;
            }
            else {
                db.query(insertStatement, items,
                    (err) => {
                        if (err) {
                            return res.status(400).json({ message: "Unable to insert item" })
                        }
                    });
                count++;
            }

        }
        const total = count + reject;
        return res.status(200).json({ message: `${count} employee Added Among ${total} Employees` })

    });



});


app.post('/', body('email').isEmail(), (req, res) => {
    const { firstname, lastname, email } = req.body

    if (!firstname || !lastname || !email) return res.status(400).json({ message: "Fill All the Fields" })
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array()[0].msg });
    }
    const insertQuery = 'insert into `employee`(`firstname`,`lastname`,`email`) VALUES(?,?,?)'
    const query = mysql.format(insertQuery, [firstname, lastname, email])
    db.query(query, function (err, response) {
        if (err) return res.status(400).json({ message: "Error Occured" })
        console.log(response)
        res.status(200).json({ message: "Employee Added Successfully!!" })
    })
})

app.get('/show', (req, res) => {
    db.query("SELECT * FROM employee", function (err, result) {
        if (err) return res.status(400).json({ message: "Something Went Wrong" });
        res.status(200).send(result)
    })
})


app.post('/sendmail', body('from').isEmail(), async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",  // Replace with your live SMTP server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: req.body.from,
            pass: req.body.password,
        },
    });
    let info
    const { from, password, subject, text } = req.body
    if (!from || !password || !text || !subject) {
        return res.status(400).json({ message: "Fill all the fields" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array()[0].msg });
    }
    try {
        info = await transporter.sendMail({
            from: req.body.from, // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject, // Subject line
            html: req.body.text // html body
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Problem With server.Check Your Email Password." });
    }


    if (info.messageId) {
        res.status(200).json({ message: "Mail Sent to Selected users" })
    } else {
        res.status(400).json({ message: "Something Wrong.Try Aagain" })
    }
})
