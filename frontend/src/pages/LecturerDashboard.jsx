import React from "react";
import profilepic from "../assets/9.jpg";
import pic1 from "../assets/1.png";
import pic2 from "../assets/2.png";
import pic3 from "../assets/3.png";

const Dashboard = () => {
  return (
    <div className="dashboard">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo">
          <h2>MotionIQ</h2>
          <p>Instructor Portal</p>
        </div>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Upload Video</li>
          <li>Manage Videos</li>
          <li>Guided Questions</li>
          <li>Student Answers</li>
          <li>Reflections</li>
          <li>Discussion Moderation</li>
          <li>Feedback</li>
        </ul>

        <div className="profile">
          <img src={profilepic} alt="profile" />
          <div>
            <h4>Dr. Julian Reed</h4>
            <p>Film & Media Dept.</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">
        
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your motion-picture learning courses</p>
          </div>
          <button className="btn">+ New Course</button>
        </div>

        {/* STATS */}
        <div className="cards">
          <div className="card">
            <h3>Total Videos</h3>
            <h2>24</h2>
          </div>
          <div className="card">
            <h3>Pending Reviews</h3>
            <h2>12</h2>
          </div>
          <div className="card">
            <h3>Flagged Comments</h3>
            <h2>3</h2>
          </div>
          <div className="card">
            <h3>Weekly Reflections</h3>
            <h2>45</h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-section">
          <div className="table-header">
            <h3>Recently Uploaded Videos</h3>
            <span>View All</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Questions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src={pic1} alt="Video Thumbnail" /></td>
                <td>Intro to Cinematography</td>
                <td>5</td>
                <td className="edit">Edit</td>
              </tr>
              <tr>
                <td><img src={pic2} alt="Video Thumbnail" /></td>
                <td>Lighting Techniques</td>
                <td>8</td>
                <td className="edit">Edit</td>
              </tr>
              <tr>
                <td><img src={pic3} alt="Video Thumbnail" /></td>
                <td>Post-Production Basics</td>
                <td>4</td>
                <td className="edit">Edit</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;