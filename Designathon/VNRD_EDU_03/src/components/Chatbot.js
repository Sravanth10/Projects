import React, { useState } from "react";
import "./Chatbotstyle.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleMessageSend = () => {
    // Placeholder function for handling message send
    // You can implement the logic to send and receive messages here
    const inputField = document.querySelector('.chatbot-input input[type="text"]');
    const message = inputField.value.trim();

    if (message !== '') {
      // Add the message to the messages array
      setMessages(prevMessages => [...prevMessages, message]);

      // Clear the input field
      inputField.value = '';
    }
  };

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="chatbot-container">
      <img
        src="https://www.shutterstock.com/image-vector/chatbot-icon-concept-chat-bot-600nw-2132342911.jpg"
        alt="Chat Bot Icon"
        className="chatbot-icon"
        onClick={toggleChatbot}
      />
      {isVisible && (
        <div className="chatbot">
          {/* Chat bot interface content */}
          <div className="chatbot-messages">
            {/* Display chat messages */}
            {messages.map((message, index) => (
              <div key={index} className="chatbot-message">
                {message}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            {/* Input field for sending messages */}
            <input type="text" placeholder="Type your message..." />
            <button onClick={handleMessageSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
