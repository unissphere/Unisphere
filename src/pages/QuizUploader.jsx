// QuizUploader.jsx
import React, { useState } from 'react';

const QuizUploader = ({ onQuizGenerated, onBackToStudy }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [quizSettings, setQuizSettings] = useState({
    questionCount: 5,
    difficulty: 'medium',
    questionType: 'multiple-choice'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const generateQuiz = async () => {
    setIsGenerating(true);
    
    // Simulate quiz generation
    setTimeout(() => {
      const mockQuiz = {
        title: `Quiz from ${uploadedFile.name}`,
        questions: Array.from({ length: quizSettings.questionCount }, (_, i) => ({
          question: `Question ${i + 1}: What is the main concept discussed in section ${i + 1}?`,
          options: [
            `Concept A related to ${uploadedFile.name.split('.')[0]}`,
            `Concept B from the material`,
            `Concept C discussed in depth`,
            `Concept D as a supporting idea`
          ],
          answer: Math.floor(Math.random() * 4),
          difficulty: quizSettings.difficulty
        }))
      };
      
      if (onQuizGenerated) {
        onQuizGenerated(mockQuiz);
      }
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-teal-200 to-blue-200">
      {/* Header */}
      <div className="w-full bg-white/60 backdrop-blur-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 border-2 border-green-400 rounded-lg"></div>
              <div className="absolute inset-1 border border-green-300 rounded-md"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-green-500">?</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
              Quiz Generator
            </h1>
          </div>
          <button 
            onClick={onBackToStudy}
            className="text-green-500 hover:text-green-600 font-medium transition-colors"
          >
            ← back to study assistant
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-green-500 bg-green-50/50' 
                  : 'border-green-300 hover:border-green-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="text-6xl">📚</div>
                <h3 className="text-2xl font-semibold text-green-600">
                  Upload Material for Quiz
                </h3>
                <p className="text-green-500 max-w-md mx-auto">
                  Upload your study materials to generate custom quiz questions.
                  Supports PDF, DOCX, TXT files.
                </p>
                <input
                  type="file"
                  onChange={handleFileInput}
                  accept=".pdf,.docx,.txt,.doc"
                  className="hidden"
                  id="quiz-file-upload"
                />
                <label
                  htmlFor="quiz-file-upload"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl font-medium hover:from-green-500 hover:to-teal-600 transition-all duration-300 cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
            </div>

            {/* Quiz Settings */}
            {uploadedFile && (
              <div className="space-y-6">
                <div className="bg-green-50/50 p-4 rounded-xl">
                  <p className="text-green-700">
                    <strong>File:</strong> {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </p>
                </div>

                <div className="bg-white/70 p-6 rounded-xl border border-green-200">
                  <h4 className="text-xl font-semibold text-green-600 mb-4">Quiz Settings</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-green-600 font-medium mb-2">
                        Number of Questions
                      </label>
                      <select
                        value={quizSettings.questionCount}
                        onChange={(e) => setQuizSettings({...quizSettings, questionCount: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 rounded-lg border border-green-200 bg-white/70 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value={3}>3 Questions</option>
                        <option value={5}>5 Questions</option>
                        <option value={10}>10 Questions</option>
                        <option value={15}>15 Questions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-green-600 font-medium mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={quizSettings.difficulty}
                        onChange={(e) => setQuizSettings({...quizSettings, difficulty: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-green-200 bg-white/70 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-green-600 font-medium mb-2">
                        Question Type
                      </label>
                      <select
                        value={quizSettings.questionType}
                        onChange={(e) => setQuizSettings({...quizSettings, questionType: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg border border-green-200 bg-white/70 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="true-false">True/False</option>
                        <option value="mixed">Mixed</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={generateQuiz}
                    disabled={isGenerating}
                    className={`mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl font-medium ${
                      isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-500 hover:to-teal-600'
                    } transition-all duration-300`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Generating Quiz...
                      </span>
                    ) : (
                      'Generate Quiz'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizUploader;