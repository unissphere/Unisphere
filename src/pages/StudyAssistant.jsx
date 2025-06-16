import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudyAssistant = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-300 via-pink-200 to-orange-200">
      {/* Header */}
      <div className="w-full bg-white/60 backdrop-blur-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 border-2 border-red-400 rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-400 transform -translate-x-0.5"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-400 transform -translate-y-0.5"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-400">U</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Study Assistant
            </h1>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            ← go to home
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-red-500">Study Assistant</h2>
            <p className="text-red-400 text-lg">Your AI-powered study companion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className="p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col items-center text-center"
              onClick={() => navigate('/study/upload-notes')}
            >
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-red-500 mb-2">Upload Notes</h3>
              <p className="text-red-400">Organize and store your study materials</p>
            </div>

            <div 
              className="p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col items-center text-center"
              onClick={() => navigate('/study/quiz')}
            >
              <div className="text-5xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-red-500 mb-2">Quiz Generator</h3>
              <p className="text-red-400">Create quizzes from your materials</p>
            </div>

            <div className="p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col items-center text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-red-500 mb-2">Study Planner</h3>
              <p className="text-red-400">Schedule your study sessions</p>
            </div>

            <div className="p-8 bg-white/70 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col items-center text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-red-500 mb-2">Progress Tracker</h3>
              <p className="text-red-400">Monitor your learning progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAssistant;