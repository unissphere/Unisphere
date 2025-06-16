import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SocialConnector from './pages/SocialConnector';
import Chatroom from './pages/Chatroom';
import StudyAssistant from './pages/StudyAssistant';
import UploadNotes from './pages/UploadNotes';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/social" element={<SocialConnector />} />
        <Route path="/chat/:roomName/:roomType" element={<Chatroom />} />
        <Route path="/study" element={<StudyAssistant />} />
        <Route path="/study/upload-notes" element={<UploadNotes />} />
        <Route path="/study/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App; 