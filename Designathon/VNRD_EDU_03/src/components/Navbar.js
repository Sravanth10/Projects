import { Link } from "react-router-dom";
import "./Navstyle.css";
import React from "react";
const Navbar = () => {

    
  return (
    
  <div className="header">
    <Link to="/">
        <h1>
            StudySync
        </h1>
    </Link>
    <ul className="nav-menu">
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/Feedback">Feedback</Link>
        </li>
    </ul>
    
  </div>
  )
};

export default Navbar;