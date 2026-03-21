import React, { useState } from "react";
import "../styles/Discussion.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import {
  MdDashboard,
  MdPlayCircle,
  MdQuestionAnswer,
  MdNotes,
  MdForum,
  MdFeedback,
  MdPerson,
  MdSettings,
} from "react-icons/md";

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import boy from "../assets/boy.jpg";

const Discussion = () => {

  // ✅ Approved discussions (visible)
  const [approved, setApproved] = useState([
    {
      img: img1,
      title: "The Minute",
      category: "SHORT FILM",
      messages: [{ user: "John", text: "Interesting decisions!" }]
    },
    {
      img: img2,
      title: "Office Situation",
      category: "COMEDY",
      messages: [{ user: "Sara", text: "Very realistic!" }]
    }
  ]);

  // ❗ Pending (not visible)
  const [pending, setPending] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  const [selected, setSelected] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  // 🔥 CREATE → SEND TO ADMIN
  const createDiscussion = () => {
    if (!newTopic.trim()) return;

    const request = {
      img: img3,
      title: newTopic,
      category: "PENDING",
      messages: []
    };

    setPending([...pending, request]);
    setNewTopic("");
    setShowCreate(false);

    alert("Request sent to administrator for approval");
  };

  // 🔥 SIMULATE ADMIN APPROVAL (for demo)
  const approveDiscussion = (index) => {
    const approvedItem = pending[index];

    setApproved([approvedItem, ...approved]);
    setPending(pending.filter((_, i) => i !== index));
  };

  // CHAT
  const openChat = (item) => {
    setSelected(item);
    setShowChat(true);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updated = {
      ...selected,
      messages: [...selected.messages, { user: "You", text: newMessage }]
    };

    setSelected(updated);
    setNewMessage("");
  };

  
  const handleLogout = () => {
  // optional: clear data
  localStorage.clear();

  navigate("/"); // go to login page
};

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">MotionIQ</h2>

        <ul className="menu">
          <li><Link to="/student-dashboard"><MdDashboard /> Dashboard</Link></li>
          <li><Link to="/videos"><MdPlayCircle /> Videos</Link></li>
          <li><Link to="/guided-questions"><MdQuestionAnswer /> Guided Questions</Link></li>
          <li><Link to="/reflections"><MdNotes /> Reflections</Link></li>
          <li className="active"><MdForum /> Discussion</li>
          <li><MdFeedback /> Feedback</li>
        </ul>

           <div className="bottom-menu">
           <p><MdPerson /> Profile</p>
           <div className="settings-container">
                <p onClick={() => setShowSettings(!showSettings)}>
                    <MdSettings /> Settings
                </p>

                {showSettings && (
                    <div className="settings-dropdown">
                    <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
                </div>
           </div>
           
            <div className="premium">
            <p className="premium-title">Premium Access</p>
            <p>Unlock advanced tools.</p>
            <button>Upgrade Now</button>
            </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
                <div className="header">
                  <input placeholder="Search lessons, films, or feedback..." />
        
                  <div className="profile">
                    <div>
                      <h4>Alex Rivera</h4>
                      <p>Student ID: #8291</p>
                    </div>
                    <img src={boy} alt="profile" />
                  </div>
                </div>
        

        <div className="header">
          <h1>Discussions</h1>

          <button className="create-btn" onClick={() => setShowCreate(true)}>
            + Create Discussion
          </button>
        </div>

        {/* ✅ APPROVED LIST */}
        <h3>Approved Discussions</h3>
        <div className="video-list">
          {approved.map((item, i) => (
            <div className="video-item" key={i}>
              <img src={item.img} alt="" />

              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>

              <button onClick={() => openChat(item)}>Open Chat</button>
            </div>
          ))}
        </div>

        {/* ❗ PENDING LIST */}
        {pending.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px" }}>Pending Approval</h3>
            <div className="video-list">
              {pending.map((item, i) => (
                <div className="video-item pending" key={i}>
                  <img src={item.img} alt="" />

                  <div className="info">
                    <h3>{item.title}</h3>
                    <p>Waiting for approval</p>
                  </div>

                  {/* 🔥 DEMO ADMIN BUTTON */}
                  <button onClick={() => approveDiscussion(i)}>
                    Approve (Demo)
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CHAT MODAL */}
        {showChat && (
          <div className="modal">
            <div className="chat-box">

              <h2>{selected.title}</h2>

              <div className="messages">
                {selected.messages.map((msg, i) => (
                  <div key={i}>
                    <strong>{msg.user}:</strong> {msg.text}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>

              <button 
                className="close-btn"
                onClick={() => setShowChat(false)}
                >
                Close
              </button>

            </div>
          </div>
        )}

        {/* CREATE MODAL */}
        {showCreate && (
          <div className="modal">
            <div className="modal-content">

              <h2>Create Discussion</h2>

              <input
                placeholder="Enter topic..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />

              <div className="modal-actions">
                <button onClick={() => setShowCreate(false)}>Cancel</button>
                <button onClick={createDiscussion}>Send Request</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Discussion;