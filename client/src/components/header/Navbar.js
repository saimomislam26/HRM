import React from 'react'
import { NavLink } from 'react-router-dom'
import HRM from '../../Image/HRM.png'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-transparent">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/" ><img src={HRM} alt="brandLOgo" style={{ height: "15%", width: "15%" }} className="img-fluid" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav ">

                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/"><span className="font-weight-bolder nav-color">Add Employee</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/csv"><span className="font-weight-bolder nav-color">Add CSV</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/show"><span className="font-weight-bolder nav-color">Show Employee</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link " to="/contact"><span className="font-weight-bolder nav-color">Send Email</span></NavLink>
                            </li>


                        </ul>
                    </div>


                </div>
            </nav >
        </div >
    )
}

export default Navbar
