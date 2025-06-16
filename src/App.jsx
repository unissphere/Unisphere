import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SocialConnector from './pages/SocialConnector'; // Note: No "Page" suffix
import StudyAssistant from './pages/StudyAssistant';   // Note: No "Page" suffix
import Chatroom from './pages/Chatroom';
import UploadNotes from './pages/UploadNotes';
import QuizPage from './pages/QuizPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/social" element={<SocialConnector />} />
        <Route path="/study" element={<StudyAssistant />} />
        <Route path="/study/upload-notes" element={<UploadNotes />} />
        <Route path="/study/quiz" element={<QuizPage />} />
        <Route path="/chat/:roomName/:roomType" element={<Chatroom />} />
      </Routes>
    </Router>
  );
};

export default App;