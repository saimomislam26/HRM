const express = require('express');
const mysql = require('mysql');
const db = require('../server');
const router = express.Router();

const newUser = (req, res) => {
    const { firstname, lastname, email } = req.body
    const insertQuery = 'insert into `employee`(`firstname`,`lastname`,`email`) VALUES(?,?,?)'
    const query = mysql.format(insertQuery, [firstname, lastname, email])
    console.log("I am from new user")
    db.query(query, function (err, response) {
        console.log("I am from connection inside")
        if (err) throw err
        console.log(response)
    })
    // db.getConnection(function (err, connection) {
    //     console.log("I am from connection outside")
    //     connection.query(query, function (err, response) {
    //         console.log("I am from connection inside")
    //         if (err) throw err
    //         console.log(response)
    //         connection.release()
    //     })
    // })

}

router.route('/')
    .post(newUser)


module.exports = router