import React, { useState } from 'react';

const StudyAssistantPage = ({ onBackToHome }) => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('summarizer');
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'notes-upload', 'quiz-upload'

  const handleSummarize = () => {
    if (inputText.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setSummary(`This is a generated summary of your text about "${inputText.substring(0, 20)}...". The AI has analyzed the key points and condensed them into a concise format.`);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleGenerateQuiz = () => {
    if (inputText.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        setQuizQuestions([
          {
            question: `What is the main topic of the text about "${inputText.substring(0, 15)}..."?`,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            answer: 0
          },
          {
            question: "Which of these is NOT mentioned in the text?",
            options: ["Concept A", "Concept B", "Concept C", "Concept D"],
            answer: 3
          }
        ]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleNotesExtracted = (extractedText) => {
    setInputText(extractedText);
    setCurrentView('main');
    setActiveTab('summarizer');
  };

  const handleQuizGenerated = (quiz) => {
    setQuizQuestions(quiz.questions);
    setCurrentView('main');
    setActiveTab('quiz');
  };

  // Render different views based on currentView state
  if (currentView === 'notes-upload') {
    return <NotesUploader onNotesExtracted={handleNotesExtracted} onBackToStudy={() => setCurrentView('main')} />;
  }

  if (currentView === 'quiz-upload') {
    return <QuizUploader onQuizGenerated={handleQuizGenerated} onBackToStudy={() => setCurrentView('main')} />;
  }

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
            onClick={onBackToHome}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            ← back to dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Upload Options */}
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => setCurrentView('notes-upload')}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
          >
            <span>📝</span>
            <span>Upload Notes</span>
          </button>
          <button
            onClick={() => setCurrentView('quiz-upload')}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-xl font-medium hover:from-green-500 hover:to-teal-600 transition-all duration-300"
          >
            <span>📚</span>
            <span>Generate Quiz from File</span>
          </button>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-red-200">
            <button
              onClick={() => setActiveTab('summarizer')}
              className={`flex-1 py-4 font-medium text-lg ${
                activeTab === 'summarizer' 
                  ? 'text-red-500 border-b-2 border-red-500' 
                  : 'text-red-400 hover:text-red-500'
              }`}
            >
              Text Summarizer
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-4 font-medium text-lg ${
                activeTab === 'quiz' 
                  ? 'text-red-500 border-b-2 border-red-500' 
                  : 'text-red-400 hover:text-red-500'
              }`}
            >
              Quiz Generator
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Input Area */}
            <div className="mb-8">
              <label className="block text-red-500 font-medium mb-2">
                {activeTab === 'summarizer' ? 'Enter text to summarize' : 'Enter topic for quiz questions'}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeTab === 'summarizer' 
                    ? 'Paste your lecture notes, textbook excerpts, or any study material here...' 
                    : 'Enter a topic or paste text to generate quiz questions about...'
                }
                className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400 resize-none min-h-[150px]"
                rows="5"
              />
              <button
                onClick={activeTab === 'summarizer' ? handleSummarize : handleGenerateQuiz}
                disabled={isLoading || !inputText.trim()}
                className={`mt-4 px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl font-medium ${
                  isLoading || !inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-500 hover:to-red-600'
                } transition-all duration-300`}
              >
                {isLoading ? 'Processing...' : activeTab === 'summarizer' ? 'Summarize' : 'Generate Quiz'}
              </button>
            </div>

            {/* Results Area */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
              </div>
            ) : (
              <>
                {activeTab === 'summarizer' && summary && (
                  <div className="bg-white/70 p-6 rounded-xl border border-red-200">
                    <h3 className="text-xl font-semibold text-red-500 mb-4">Summary</h3>
                    <p className="text-red-700 whitespace-pre-line">{summary}</p>
                  </div>
                )}

                {activeTab === 'quiz' && quizQuestions.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-red-500">Generated Quiz</h3>
                    {quizQuestions.map((question, index) => (
                      <div key={index} className="bg-white/70 p-6 rounded-xl border border-red-200">
                        <p className="font-medium text-red-700 mb-3">{question.question}</p>
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center">
                              <input 
                                type="radio" 
                                id={`q${index}-opt${optIndex}`} 
                                name={`question-${index}`} 
                                className="mr-2 text-red-500 focus:ring-red-300"
                              />
                              <label htmlFor={`q${index}-opt${optIndex}`} className="text-red-700">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-600 transition-all duration-300">
                      Check Answers
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NotesUploader = ({ onNotesExtracted, onBackToStudy }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    try {
      const text = await extractTextFromFile(file);
      setExtractedText(text);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsProcessing(false);
    }
  };

  const extractTextFromFile = async (file) => {
    return new Promise((resolve) => {
      // Simulate file processing
      setTimeout(() => {
        const mockText = `Extracted content from ${file.name}:\n\nThis is the extracted text content from your uploaded file. In a real implementation, this would contain the actual text extracted from PDF, DOCX, or text files using appropriate libraries like PDF.js or mammoth.js.\n\nKey concepts:\n- Machine Learning fundamentals\n- Neural Networks architecture\n- Deep Learning applications\n- Data preprocessing techniques`;
        resolve(mockText);
      }, 2000);
    });
  };

  const handleUseNotes = () => {
    if (onNotesExtracted) {
      onNotesExtracted(extractedText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200">
      {/* Header */}
      <div className="w-full bg-white/60 backdrop-blur-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 border-2 border-blue-400 rounded-lg"></div>
              <div className="absolute inset-2 bg-blue-400 rounded-sm opacity-60"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">📝</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Notes Uploader
            </h1>
          </div>
          <button 
            onClick={onBackToStudy}
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            ← back to study assistant
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50/50' 
                  : 'border-blue-300 hover:border-blue-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="text-6xl">📄</div>
                <h3 className="text-2xl font-semibold text-blue-600">
                  Upload Your Study Notes
                </h3>
                <p className="text-blue-500 max-w-md mx-auto">
                  Drag and drop your files here, or click to browse. 
                  Supports PDF, DOCX, TXT files.
                </p>
                <input
                  type="file"
                  onChange={handleFileInput}
                  accept=".pdf,.docx,.txt,.doc"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300 cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
            </div>

            {/* Processing/Results */}
            {uploadedFile && (
              <div className="mt-8 space-y-6">
                <div className="bg-blue-50/50 p-4 rounded-xl">
                  <p className="text-blue-700">
                    <strong>Uploaded:</strong> {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </p>
                </div>

                {isProcessing ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <span className="ml-4 text-blue-600 font-medium">Processing your notes...</span>
                  </div>
                ) : extractedText ? (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-blue-600">Extracted Text Preview</h4>
                    <div className="bg-white/70 p-6 rounded-xl border border-blue-200 max-h-64 overflow-y-auto">
                      <pre className="text-blue-700 whitespace-pre-wrap text-sm">{extractedText}</pre>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleUseNotes}
                        className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-xl font-medium hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
                      >
                        Use These Notes
                      </button>
                      <button
                        onClick={() => {
                          setUploadedFile(null);
                          setExtractedText('');
                        }}
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-400 transition-all duration-300"
                      >
                        Upload Different File
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAssistantPage;