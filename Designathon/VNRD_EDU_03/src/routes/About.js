import React from "react";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import "./AboutStyle.css"

const About = () => {
  return <div>
    <Navbar/>
    <div className="cont">
    <h1>About Us</h1>
    <br />
    <br />
    <p>Welcome to StudySync, your ultimate destination for interactive learning, assessment, and achievement. At StudySync, we believe that education is not just about acquiring knowledge but also about mastering skills and achieving your full potential. That's why we've created a platform that offers a unique blend of courses, quizzes, and scoring mechanisms to help learners excel in their educational journey.</p>
    </div>
    <Footer />
  </div>;
};

export default About;