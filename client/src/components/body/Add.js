import React, { useState } from 'react'
import employee from '../../Image/clipart2905856.png'
import Message from '../AlertMessage/Message'
const Add = () => {
    const [user, setUser] = useState({
        firstname: "", email: "", lastname: ""
    })
    const [message, setMessage] = useState("");
    let name, value, data;
    const eventHandle = (e) => {
        name = e.target.name
        value = e.target.value

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault();
        const { firstname, lastname, email } = user
        const res = await fetch('http://localhost:5000/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname, lastname, email
            })
        })
        data = await res.json()
        if (res.status === 400 || !data) {
            setMessage(data.message)
        }
        else if (res.status === 500) {
            setMessage("Invalide Mail Format")
        }
        else {
            console.log(user)
            setMessage("Registration Successful!!")
        }
        setUser({
            firstname: "", email: "", lastname: ""
        })

    }
    return (
        <div className="container">
            {
                message ? <Message message={message} /> : null
            }
            <div className="signup-form ">
                <div className="signup-content border-light">
                    <div className="row ">
                        <h1 className="text-center">Add Employee</h1>
                        <div className="col-md-8 order-sm-2 order-md-1 order-lg-1">
                            <form method="POST" >
                                <div className="form-group mt-5">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-user"></span>
                                            </span>
                                        </div>
                                        <input type="text" autoComplete="off" className="form-control" name="firstname"
                                            value={user.name} onChange={eventHandle} placeholder="First Name" required="required" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-user"></span>
                                            </span>
                                        </div>
                                        <input type="text" autoComplete="off" className="form-control" name="lastname"
                                            value={user.name} onChange={eventHandle} placeholder="last Name" required="required" />
                                    </div>

                                    <div className="input-group mt-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <span className="fa fa-paper-plane"></span>
                                            </span>
                                        </div>
                                        <input autoComplete="off" type="email" className="form-control" name="email"
                                            value={user.email} onChange={eventHandle} placeholder="Email Address" required="required" />
                                    </div>
                                    <div className="form-group for-btn">
                                        <input type="submit" name="ADD" className="btn btn-primary btn-lg mt-3" value="ADD" onClick={postData} />
                                    </div>

                                </div>
                            </form>

                        </div>
                        <div className="col-md-4 d-flex justify-content-center align-items-center order-sm-1 order-md-2 order-lg-2 mt-3">
                            <img src={employee} alt="employeeImage" className="img-fluid" />
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default Add

