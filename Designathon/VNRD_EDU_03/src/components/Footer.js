import "./FooterStyle.css"
import React from 'react'
import { useEffect } from "react";
import { FaHome,FaPhone, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
const Footer = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
      useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
          "src",
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);
  return (
    <div className="footer">
        <div className="foot-cont">
            <div className="left">
                <div className="location">
                    <FaHome size={20} style={{color:"#fff"
                    ,marginRight: "2rem"}}/>
                    <div>
                    <p>Vnr Vjiet</p>
                    <p>Hyderabad</p>
                    </div>
                </div>
                <div className="phone">
                    <h4><FaPhone size={20} style={{color:"#fff"
                    ,marginRight: "2rem"}}/>
                    +91 xxxxx xxx789</h4>
                </div>
                <div id="google_translate_element"></div>

            </div>
            <div  className="right">
                <h4>About the website</h4>
                <p>At StudySync, we are dedicated to providing comprehensive courses, engaging quizzes, and accurate scoring systems to empower learners worldwide. Join us in the pursuit of knowledge and achievement today!
                </p>
                <div className="social">
                <FaFacebook size={30} style={{color:"#fff"
                    ,marginRight: "1rem"}}/>
                <FaTwitter size={30} style={{color:"#fff"
                    ,marginRight: "1rem"}}/>
                <FaLinkedin size={30} style={{color:"#fff"
                    ,marginRight: "1rem"}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer;