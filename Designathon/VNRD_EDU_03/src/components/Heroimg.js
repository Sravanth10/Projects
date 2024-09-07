import { Link } from "react-router-dom"
import "./Heroimgstyle.css"
import React from 'react'

const Heroimg = () => {
  return (
    <div className="hero">
        <div className="mask">
            <img className="into-img"
            alt=""
            src="https://www.arch2o.com/wp-content/uploads/2015/06/Arch2O-10-places-to-study-online-architecture-programs-get-architecture-courses-4.jpg"/>
        </div>
        <div className="content">
        <p>HI, THIS IS A PROTOTYPE WEBSITE</p>
        <h1>DESIGN-A-THON</h1>
        <div>
          <Link to="/about"
          className="btn">ABOUT</Link>
        </div>
        </div>
    </div>
  )
}

export default Heroimg