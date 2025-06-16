// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SocialConnectorPage from './components/SocialConnectorPage';
import StudyAssistantPage from './components/StudyAssistantPage';
import ChatroomPage from './components/ChatroomPage';
import UploadNotesPage from './components/UploadNotesPage';
import QuizPage from './components/QuizPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/social" element={<SocialConnectorPage />} />
        <Route path="/study" element={<StudyAssistantPage />} />
        <Route path="/study/upload-notes" element={<UploadNotesPage />} />
        <Route path="/study/quiz" element={<QuizPage />} />
        <Route path="/chat/:roomName/:roomType" element={<ChatroomPage />} />
      </Routes>
    </Router>
  );
};

export default App;