
import "./CourseStyle.css"
import Course from "./Course"
import ProjectCardData from "./Workdata"

import React from 'react'

const Work = () => {
  return (
    <div className="work-cont">
        <h1 className="proj-head">Journey </h1>
        <div className="proj-cont">
            {ProjectCardData.map((val,ind) => {
                return(
                    <Course 
                    key={ind}
                    imgsrc={val.imgsrc}
                    title={val.title}
                    status={val.status}
                    text1={val.text1}
                    text2={val.text2}
                    view={val.view}
                    />
                )
            })}
        </div>
    </div>
  )
}

export default Work