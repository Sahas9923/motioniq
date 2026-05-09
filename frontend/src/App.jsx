import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import VideoLibrary from "./pages/VideoLibrary";
import VideoPlayer from "./pages/VideoPlayer";
import GuidedQuestions from "./pages/GuidedQuestions";
import Reflection from "./pages/Reflection";  
import Discussion from "./pages/Discussion";
import LecturerDashboard from "./pages/LecturerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminVideoLibrary from "./pages/AdminVideoLibrary";  
import AdminUploadVideo from "./pages/AdminUploadVideo";
import AdminEditVideo from "./pages/AdminEditVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/videos" element={<VideoLibrary />} />
        <Route path="/player" element={<VideoPlayer />} />
        <Route path="/guided-questions" element={<GuidedQuestions />} />
        <Route path="/reflections" element={<Reflection />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-videos" element={<AdminVideoLibrary />} />
        <Route path="/admin-upload" element={<AdminUploadVideo />} />
        <Route path="/admin-edit-video" element={<AdminEditVideo />} />


      </Routes>

    </Router>
  );
}

export default App;