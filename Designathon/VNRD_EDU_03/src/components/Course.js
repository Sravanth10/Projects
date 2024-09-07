import { NavLink } from "react-router-dom"
import "./CourseStyle.css"
import { Link } from "react-router-dom"
import React from 'react'

const Course = (props) => {
  return (
    <div className="proj-card">
                <img src={props.imgsrc} alt="" />
                <h2 className="proj-title">{props.title}</h2>
                <div className="pro-det">
                <p>{props.status}</p>
                    <p>{props.text1}</p>
                    <p>{props.text2}</p>
                    <div className="pro-btns">
                        <NavLink to={props.view} className="btn">
                            View
                        </NavLink>
                        <Link to="/quiz" className="btn">
                            Quiz
                        </Link>
                        
                    </div>
                </div>
            </div>
  )
}

export default Course