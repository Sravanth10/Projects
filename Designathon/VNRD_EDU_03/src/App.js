import React from "react";
import "./index.css";
import About from "./routes/About";
import Feedback from "./routes/Feedback"
import Home from "./routes/Home";
import QuizApp from "./routes/Quizapp";
import { Route, Routes } from "react-router-dom";
import Game from "./routes/game";

function App() {
  
  return (
    
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/game" element={<Game />} />
      </Routes>


      
    </>
  );
}

export default App;