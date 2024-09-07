import React, { useState, useEffect } from 'react';
import './QuizApp.css'; // Import your CSS file
import Chart from 'chart.js/auto';
import {Link} from "react-router-dom"
const questions = [
    {
      question: 'What is the primary reproductive organ in flowering plants?',
      options: ['stamen', 'sepal', 'petal', 'ovary'],
      correctAnswer: 'ovary',
      ref: ''
    },
    {
      question: 'What process involves the transfer of pollen grains from the anther to the stigma of a flower?',
      options: ['Fertilisation', 'germination', 'pollination', 'photosynthesis'],
      correctAnswer: 'pollination',
      ref: ''
    },
    {
      question: 'In angiosperms, what is the male gamete contained within a pollen grain called?',
      options: ['pollen tube', 'sperm', 'embryo', 'ovule'],
      correctAnswer: 'sperm',
      ref: ''
    },
    {
      question: 'Which part of the flower develops into a seed after fertilization?',
      options: ['style', 'anther', 'stigma', 'ovary'],
      correctAnswer: 'ovary',
      ref: 'https://www.youtube.com/watch?v=bUjVHUf4d1I'
    },
    {
      question: 'What is the process of fusion of the male and female gametes called in plants?',
      options: ['reproduction', 'germination', 'fertilisation', 'pollination'],
      correctAnswer: 'fertilisation',
      ref: 'https://www.youtube.com/watch?v=tYj-QYDM6Vw'
    },
    {
      question: 'Which type of pollination involves the transfer of pollen from the anther of a flower to the stigma of the same flower?',
      options: ['self pollination', 'insect pollination', 'cross pollination', 'wind pollination'],
      correctAnswer: 'self pollination',
      ref: 'https://www.youtube.com/watch?v=bTTjIs1tZKk'
    },
    {
      question: 'What structure protects the developing embryo within a seed?',
      options: ['testa', 'endosperm', 'Cotyledon', 'pericarp'],
      correctAnswer: 'testa',
      ref: ''
    },
    {
      question: 'In gymnosperms, what is the female reproductive organ called?',
      options: ['stamen', 'ovule', 'pollen grain', 'sepal'],
      correctAnswer: 'ovule',
      ref: ''
    },
    {
      question: 'Which part of a flower receives pollen during pollination?',
      options: ['anther', 'overy', 'stigma', 'style'],
      correctAnswer: 'stigma',
      ref: ''
    },
    {
      question: 'What is the process by which seeds develop into new plants?',
      options: ['pollination', 'fertilisation', 'germination', 'photosynthesis'],
      correctAnswer: 'germination',
      ref: ''
    }
  ];
  

  const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [points, setPoints] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // Initial time limit in seconds
    const [chart, setChart] = useState(null); // State for storing the Chart instance
    const [incorrectLinks, setIncorrectLinks] = useState([]); // State for storing incorrect question links
  
    useEffect(() => {
      // Function to decrement timer every second
      const timer = setInterval(() => {
        if (timeLeft > 0 && !showScore) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(timer);
          setShowScore(true);
          renderPieChart(); // Call function to render pie chart when quiz ends
        }
      }, 1000);
  
      // Cleanup function to clear the interval when component unmounts or timer reaches 0
      return () => clearInterval(timer);
    }, [timeLeft, showScore]);
  
    const handleAnswerClick = (selectedOption) => {
        if (selectedOption === questions[currentQuestion].correctAnswer) {
          setScore(score + 1);
        }
      
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
          renderPieChart(); // Call function to render pie chart when quiz ends
        }
      
        // Update points only for correct answers
        if (selectedOption === questions[currentQuestion].correctAnswer) {
          setPoints(points + 5);
        }
        renderPieChart();
      };    
  
    const handleRestartQuiz = () => {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setTimeLeft(60);
      setPoints(0); // Reset timer when restarting quiz
      if (chart) {
        chart.destroy(); // Destroy previous chart instance
      }
    };
  
    const renderPieChart = () => {
        const ctx = document.getElementById('quiz-pie-chart');
        if (ctx) {
          const correctAnswers = score;
          const incorrectAnswers = questions.length - score;
          const incorrectQuestions = questions.filter(question => (
            question.options.indexOf(question.correctAnswer) !== currentQuestion
          ));
          setChart(new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Correct Answers', 'Incorrect Answers'],
              datasets: [{
                data: [correctAnswers, incorrectAnswers],
                backgroundColor: ['#4CAF50', '#F44336']
              }]
            }
          }));
      
          // Display YouTube link for incorrect answers only
          if (incorrectAnswers > 0) {
            

            const links = incorrectQuestions.map(question => (
              <div key={question.question}>
                
                <a href={question.ref} target="_blank">{question.ref}</a>
              </div>
            ));
      
            setIncorrectLinks(links);
          } else {
            setIncorrectLinks([]);
          }
        }
      };
      
  
    return (
      <div className="quiz-app">
        {showScore ? (
          <div className="score-section">
            <h2>You scored {score} out of {questions.length}!</h2>
            <h1>Points Awarded: {points}</h1>
            <canvas id="quiz-pie-chart"></canvas>
            <h2>References for scope of improvement!!!</h2>
            <div className="incorrect-links">
              {incorrectLinks}
            </div>
            <div className='bts'>
            <button className='btn  ' onClick={handleRestartQuiz} >Restart Quiz</button>
            <Link className="btn btn" to="/game">game</Link>
          </div>
          </div>
        ) : (
          <div className="question-section">
            <div className="timer">Time left: {timeLeft} seconds</div>
            <h2>Question {currentQuestion + 1}</h2>
            <div className="question">{questions[currentQuestion].question}</div>
            <div className="options">
              {questions[currentQuestion].options.map(option => (
                <button key={option} onClick={() => handleAnswerClick(option)}>{option}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default QuizApp;