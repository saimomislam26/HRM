import React, { useEffect, useState, useContext } from 'react'
import _ from "lodash"
import Message from '../AlertMessage/Message'
import { ProjectContext } from '../Context/createContext'
const Contact = () => {
    const { user, getUserMail } = useContext(ProjectContext);
    const pageSize = 5;
    const [data, setData] = useState([])
    const [pagePost, setpagePost] = useState([])
    const [currPage, setcurrPage] = useState(1)
    const [mail, setMail] = useState({
        from: "", subject: "", text: "", password: ""
    })
    // const [user, setuserMail] = useState([])
    const [message, setMessage] = useState("")
    let name, value
    const eventHandle = (e) => {

        name = e.target.name
        value = e.target.value

        setMail({ ...mail, [name]: value })

    }
    const getData = async (e) => {
        const res = await fetch('http://localhost:5000/show', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const temp = await res.json();

        setData(temp);
        setpagePost(_(temp).slice(0).take(pageSize).value())

        if (res.status === 400 || !data) {
            window.alert(temp.message)
            console.log(temp.message)
        }
        else {
            console.log(data)
            console.log(pagePost)
        }

    }
    useEffect(() => {
        getData()
    }, []);
    const count = Math.ceil(data.length / pageSize)
    if (count === 1) return null;
    const pageNo = _.range(1, count + 1)

    const pagination = (page) => {
        setcurrPage(page);
        const startIndex = (page - 1) * pageSize
        const currPost = _(data).slice(startIndex).take(pageSize).value()
        setpagePost(currPost)
    }
    const previous = () => {
        if (currPage <= count && currPage > 1) {
            const temp = currPage - 1
            // console.log(`${temp} previous`)
            setcurrPage(temp)
            // console.log(`${currPage} previous`)
            const startIndex = (currPage - 2) * pageSize
            const currPost = _(data).slice(startIndex).take(pageSize).value()
            setpagePost(currPost)
        }
        else {
            return pagePost
        }
    }
    const next = () => {
        if (currPage < count) {
            const temp = currPage + 1
            // console.log(`${temp} next`)
            setcurrPage(temp)
            // console.log(`${currPage} next`)
            const startIndex = (currPage) * pageSize
            const currPost = _(data).slice(startIndex).take(pageSize).value()
            setpagePost(currPost)
        }
        else {

            return pagePost
        }

    }

    const sendMail = async (e) => {
        e.preventDefault();

        const { subject, text, from, password } = mail
        if (user.length == 0) {
            return setMessage("No user Selected")
        }
        user.map(async email => {
            const res = await fetch('http://localhost:5000/sendmail', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from, subject, text, email, password
                })
            })
            const temp = await res.json();

            if (res.status === 400) {
                setMessage(temp.message)
            }
            else if (res.status === 500) {
                setMessage("Give A Valid Email")
            }
            else {
                setMessage(temp.message)
            }

        })
    }
    return (
        <div className="mt-5 container">
            {
                message ? <Message message={message} /> : null
            }
            <div className="table-bord">
                <table className="table table-striped mydatatable">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagePost.map((val, ind) => {
                                return (
                                    <>
                                        <tr key={ind}>
                                            <td><input type="checkbox" value={val.id} onClick={(e) => getUserMail(data, val.email, e)} /></td>
                                            <td scope="row">{val.id}</td>
                                            <td>{val.firstname}</td>
                                            <td>{val.lastname}</td>
                                            <td>{val.email}</td>
                                        </tr>
                                    </>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <nav className="d-flex justify-content-center align-items-center">

                <button type="button" className="btn btn-primary mb-2" style={{ fontSize: "13px" }} onClick={previous} >
                    previous
                </button>
                <ul className="pagination mt-4">
                    {
                        pageNo.map((val, ind) => {

                            return (

                                <li className={val === currPage ? "page-item active" : "page-item"} key={ind}>
                                    <p className="page-link" onClick={() => pagination(val)}>
                                        {val}
                                    </p>
                                </li>
                            )

                        })
                    }

                </ul>
                <button type="button" className="btn btn-primary mb-2" style={{ fontSize: "13px" }} onClick={next}  >
                    next
                </button>
            </nav>

            {/* Form Section */}
            <div className="signup-form ">
                <div className="signup-content border-light">

                    <h1 className="text-center">Send Mail</h1>

                    <form method="POST" >
                        <div className="form-row  d-flex justify-content-center">
                            <div className="form-group mt-5  " style={{ width: "72%" }}>

                                <label htmlFor="inputName">From</label>

                                <input type="text" className="form-control" name="from"
                                    value={mail.from} onChange={eventHandle} placeholder="Sender Email" required="required" />
                            </div>

                        </div>
                        <div className="form-row  d-flex justify-content-center">
                            <div className="form-group mt-3" style={{ width: "72%" }}>

                                <label htmlFor="inputName">Password</label>

                                <input type="password" className="form-control" name="password"
                                    value={mail.password} onChange={eventHandle} placeholder="Password"
                                    required="required" />

                            </div>
                        </div>

                        <div className="form-row  d-flex justify-content-center">
                            <div className="form-group mt-3 " style={{ width: "72%" }}>

                                <label htmlFor="inputName">Subject</label>


                                <input type="text" className="form-control" name="subject"
                                    value={mail.subject} onChange={eventHandle} placeholder="Email Subject" required="required" />

                            </div>
                        </div>
                        <div className="form-row  d-flex justify-content-center">
                            <div className="form-group " style={{ width: "72%" }}>

                                <label htmlFor="inputMessage">Body</label>

                                <textarea class="form-control" name="text" onChange={eventHandle} value={mail.text}></textarea>


                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-primary mb-2 " onClick={sendMail} >
                                send Mail
                            </button>
                        </div>


                    </form>

                </div>

            </div>
        </div >
    )

}

export default Contact
