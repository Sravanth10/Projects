import React from "react";
import Navbar from "../components/Navbar"
import Heroimg from "../components/Heroimg"
import Footer from "../components/Footer";
import Work from "../components/Work";
import Chatbot from "../components/Chatbot";


function Home() {
  return (<div>
    
    <Navbar/>
    <Heroimg/>
    <Work />
    <Footer/>
    <Chatbot />
  </div>)
  ;
};

export default Home;