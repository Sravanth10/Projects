import React from 'react';
import { Link } from 'react-router-dom';
import './Heroimg2style.css';

const Heroimg2 = () => {
  // Define an array of teacher names
  const teachers = ['Mr.Ramaswamy', 'Mrs.Parathasarathy', 'Ms.Amitha'];

  return (
    <div className="hero-cont">
      <div className="content">
        <h1>Feedback</h1>
        <p>We'd love to hear your thoughts!</p>
        <form>
          <div className="form-group">
            <label htmlFor="teacher">Teacher Name:</label>
            <select id="teacher" name="teacher" required>
              {/* Map over the array of teachers and create an option for each */}
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher}>{teacher}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn">Submit Feedback</button>
          <br />
          <br />
        </form>
        <div>
          <Link to="/home" className="btn">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Heroimg2;
