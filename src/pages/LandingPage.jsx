import { useRef, useState } from 'react';



// Add this new component (place it with your other components)
const StudyAssistantPage = ({ onBackToHome }) => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('summarizer');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = () => {
    if (inputText.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setSummary(`This is a generated summary of your text about "${inputText.substring(0, 20)}...". The AI has analyzed the key points and condensed them into a concise format.`);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleGenerateQuiz = () => {
    if (inputText.trim()) {
      setIsLoading(true);
      // Simulate API call
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

// Chatroom Component
const ChatroomPage = ({ roomName, roomType, onBackToSocial }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      message: `Welcome to ${roomName}! This is the beginning of your ${roomType.toLowerCase()} conversation.`,
      timestamp: new Date(),
      isSystem: true
    },
    {
      id: 2,
      sender: "Ishi",
      message: "Hey everyone! Excited to be part of this group 🎉",
      timestamp: new Date(Date.now() - 300000),
      isSystem: false
    },
    {
      id: 3,
      sender: "Jiya",
      message: "Looking forward to collaborating with you all!",
      timestamp: new Date(Date.now() - 180000),
      isSystem: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState(['Ishi', 'Jiya', 'Sachi', 'You']);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date(),
        isSystem: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                {roomName}
              </h1>
              <p className="text-red-400 text-sm">{roomType}</p>
            </div>
          </div>
          <button 
            onClick={onBackToSocial}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            ← back to social connector
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 h-[calc(100vh-120px)]">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl h-full flex">
          {/* Sidebar - Online Users */}
          <div className="w-80 p-6 border-r border-red-200">
            <h3 className="text-xl font-semibold text-red-500 mb-4">Online ({onlineUsers.length})</h3>
            <div className="space-y-3">
              {onlineUsers.map((user, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-red-700 font-medium">{user}</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-red-400">online</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isSystem 
                      ? 'bg-red-100 text-red-600 text-center text-sm'
                      : msg.sender === 'You'
                        ? 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                        : 'bg-white/70 text-red-700 border border-red-200'
                  }`}>
                    {!msg.isSystem && msg.sender !== 'You' && (
                      <p className="text-xs font-semibold mb-1 text-red-500">{msg.sender}</p>
                    )}
                    <p>{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isSystem ? 'text-red-400' : msg.sender === 'You' ? 'text-red-100' : 'text-red-400'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-red-200">
              <div className="flex space-x-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400 resize-none"
                  rows="1"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Connector Page Component
const SocialConnectorPage = ({ onBackToHome, onNavigateToChat }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: ''
  });
  
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [personalityResult, setPersonalityResult] = useState(null);

  const interests = [
    'Technology', 'Sports', 'Music', 'Art', 'Gaming', 'Reading',
    'Photography', 'Travel', 'Cooking', 'Fitness', 'Movies', 'Dance'
  ];

  const quizQuestions = [
    {
      question: "How do you prefer to work on projects?",
      options: [
        { text: "Lead the team and coordinate", type: "leader" },
        { text: "Focus on creative solutions", type: "creative" },
        { text: "Analyze data and research", type: "analytical" },
        { text: "Support and help others", type: "supportive" }
      ]
    },
    {
      question: "What motivates you most?",
      options: [
        { text: "Achieving ambitious goals", type: "leader" },
        { text: "Creating something unique", type: "creative" },
        { text: "Solving complex problems", type: "analytical" },
        { text: "Building strong relationships", type: "supportive" }
      ]
    },
    {
      question: "In group discussions, you usually:",
      options: [
        { text: "Take charge and guide", type: "leader" },
        { text: "Suggest innovative ideas", type: "creative" },
        { text: "Ask thoughtful questions", type: "analytical" },
        { text: "Listen and encourage others", type: "supportive" }
      ]
    }
  ];

  const teamSuggestions = {
    leader: {
      type: "Leadership Team",
      description: "Perfect for organizing events and leading initiatives",
      teams: ["Student Council", "Event Management", "Project Leadership"],
      studyGroups: ["Leadership Development Study Circle", "Management Case Study Group", "Public Speaking Practice Group"]
    },
    creative: {
      type: "Creative Team",
      description: "Ideal for artistic and innovative projects",
      teams: ["Design Club", "Content Creation", "Innovation Lab"],
      studyGroups: ["Creative Writing Workshop", "Design Thinking Study Group", "Art History Discussion Circle"]
    },
    analytical: {
      type: "Research Team",
      description: "Great for data analysis and problem-solving",
      teams: ["Research Group", "Tech Development", "Academic Support"],
      studyGroups: ["Data Science Study Group", "Research Methodology Circle", "Statistics & Analysis Group"]
    },
    supportive: {
      type: "Community Team",
      description: "Excellent for building connections and support",
      teams: ["Peer Mentoring", "Community Outreach", "Student Support"],
      studyGroups: ["Peer Learning Circle", "Study Buddy Network", "Academic Support Group"]
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : prev.length < 3 ? [...prev, interest] : prev
    );
  };

  const handleQuizAnswer = (answerType) => {
    const newAnswers = [...quizAnswers, answerType];
    setQuizAnswers(newAnswers);

    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(currentQuizStep + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      
      const dominantType = Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
      );
      
      setPersonalityResult(teamSuggestions[dominantType]);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizStep(0);
    setQuizAnswers([]);
    setShowResult(false);
    setPersonalityResult(null);
  };

  const handleJoinRoom = (roomName, roomType) => {
    onNavigateToChat(roomName, roomType);
  };

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
              Unisphere
            </h1>
          </div>
          <button 
            onClick={onBackToHome}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            ← go to dashboard
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Main Content */}
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-red-500">Social Connector</h2>
            <p className="text-red-400 text-lg">Connect with like-minded students and build your network</p>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-red-500">Your Profile</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-red-500 font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                />
              </div>
              
              <div>
                <label className="block text-red-500 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-red-500 font-medium mb-2">Branch</label>
                <select
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700"
                >
                  <option value="">Select your branch</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="business">Business Administration</option>
                  <option value="psychology">Psychology</option>
                  <option value="biology">Biology</option>
                  <option value="chemistry">Chemistry</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-red-500">Your Interests</h3>
            <p className="text-red-400">Select up to 3 interests that match your hobbies and passions</p>
            
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedInterests.includes(interest)
                      ? 'bg-red-400 text-white shadow-lg transform -translate-y-1'
                      : 'bg-white/70 text-red-500 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            
            <p className="text-sm text-red-400">
              Selected: {selectedInterests.length}/3
            </p>
          </div>

          {/* Personality Quiz */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-red-500">Team Compatibility Quiz</h3>
            
            {!showResult ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-500 font-medium">
                      Question {currentQuizStep + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-red-400 text-sm">
                      {Math.round(((currentQuizStep) / quizQuestions.length) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-red-100 rounded-full h-2">
                    <div 
                      className="bg-red-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuizStep) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold text-red-600 mb-6">
                  {quizQuestions[currentQuizStep].question}
                </h4>
                
                <div className="space-y-3">
                  {quizQuestions[currentQuizStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(option.type)}
                      className="w-full p-4 text-left bg-white/70 hover:bg-red-50 border border-red-200 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-red-700"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className="text-2xl font-bold text-red-600 mb-2">
                  You're a perfect fit for: {personalityResult.type}
                </h4>
                <p className="text-red-500 mb-6">{personalityResult.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Teams Section */}
                  <div className="space-y-3">
                    <h5 className="text-lg font-semibold text-red-600">Recommended Teams:</h5>
                    {personalityResult.teams.map((team, index) => (
                      <button
                        key={index}
                        onClick={() => handleJoinRoom(team, 'Team')}
                        className="w-full bg-red-100 text-red-700 px-4 py-3 rounded-lg hover:bg-red-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                      >
                        {team}
                      </button>
                    ))}
                  </div>

                  {/* Study Groups Section */}
                  <div className="space-y-3">
                    <h5 className="text-lg font-semibold text-red-600">Recommended Study Groups:</h5>
                    {personalityResult.studyGroups.map((group, index) => (
                      <button
                        key={index}
                        onClick={() => handleJoinRoom(group, 'Study Group')}
                        className="w-full bg-blue-100 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-white border border-red-300 text-red-500 rounded-xl hover:bg-red-50 transition-all duration-300"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="px-12 py-4 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold text-lg rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl">
              Connect & Find Your Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Landing Page Component
const LandingPage = ({ onNavigateToSocial, onNavigateToStudyAssistant }) => {
  const whatsThereRef = useRef(null);
  const aboutUsRef = useRef(null);
  const [isHovered, setIsHovered] = useState({ signUp: false, logIn: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleNavClick = (section) => {
    if (section === 'whats-there') {
      whatsThereRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'about-us') {
      aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-300 via-pink-200 to-orange-200 p-4 space-y-24">

      {/* Hero Section */}
      <div className="relative w-full max-w-6xl mx-auto h-[90vh] bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-2xl rounded-[40px] shadow-2xl overflow-hidden flex items-center justify-between px-16">
        {/* Navigation */}
        <div className="absolute top-8 right-12 flex gap-8 z-10">
          <button 
            onClick={() => handleNavClick('whats-there')}
            className="text-red-400 hover:text-red-500 text-lg font-medium transition-all duration-300 hover:-translate-y-1"
          >
            what's there
          </button>
          <button 
            onClick={() => handleNavClick('about-us')}
            className="text-red-400 hover:text-red-500 text-lg font-medium transition-all duration-300 hover:-translate-y-1"
          >
            about us
          </button>
        </div>

        {/* Left */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-6xl font-light text-gray-800 leading-tight mb-4">Welcome to</h1>
            <h2 className="text-7xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent leading-tight">Unisphere</h2>
          </div>
          <p className="text-2xl text-red-400 font-normal max-w-lg">Companion in your student life</p>

          {/* CTA */}
          <div className="flex items-center gap-12 pt-8">
            <div>
              <p className="text-red-400/80 text-lg mb-3">Join us to know more</p>
              <button
                onClick={() => openModal('signup')}
                onMouseEnter={() => setIsHovered(prev => ({ ...prev, signUp: true }))}
                onMouseLeave={() => setIsHovered(prev => ({ ...prev, signUp: false }))}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 
                  ${isHovered.signUp 
                    ? 'bg-red-400 text-white shadow-xl transform -translate-y-2 shadow-red-400/30' 
                    : 'bg-red-300/50 text-red-600 hover:bg-red-300/70'}`}
              >
                Sign Up
              </button>
            </div>
            <div>
              <p className="text-red-400/80 text-lg mb-3">already have an account?</p>
              <button
                onClick={() => openModal('login')}
                onMouseEnter={() => setIsHovered(prev => ({ ...prev, logIn: true }))}
                onMouseLeave={() => setIsHovered(prev => ({ ...prev, logIn: false }))}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 border-2 
                  ${isHovered.logIn 
                    ? 'bg-red-100 text-red-600 border-red-300 shadow-lg transform -translate-y-2' 
                    : 'bg-transparent text-red-500 border-red-300/50 hover:border-red-300'}`}
              >
                Log In
              </button>
            </div>
          </div>
        </div>

        {/* Right Logo */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative">
            <div className="animate-bounce">
              <div className="w-80 h-80 relative">
                <div className="absolute inset-0 border-4 border-red-400 rounded-full"></div>
                <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-400 transform -translate-x-0.5"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-400 transform -translate-y-0.5"></div>
                <div className="absolute top-1/4 left-0 w-full h-0.5 bg-red-400 opacity-60"></div>
                <div className="absolute top-3/4 left-0 w-full h-0.5 bg-red-400 opacity-60"></div>
                <div className="absolute top-0 left-1/4 w-0.5 h-full bg-red-400 opacity-40 transform rotate-12 origin-center"></div>
                <div className="absolute top-0 right-1/4 w-0.5 h-full bg-red-400 opacity-40 transform -rotate-12 origin-center"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-bold text-red-400">U</span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 w-80 h-80 bg-red-400/10 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* What's There Section */}
      <section ref={whatsThereRef} className="max-w-6xl mx-auto p-8 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl space-y-6">
        <h2 className="text-4xl font-bold text-red-500">What's There</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white/70 backdrop-blur-xl shadow hover:shadow-lg transition cursor-pointer transform hover:-translate-y-2 hover:shadow-xl"
          onClick={onNavigateToStudyAssistant}>
            <h3 className="text-xl font-semibold text-red-500">📚 Study Assistant</h3>
            <p className="text-red-400 mt-2">AI-powered study organizer, notes, and schedule builder.</p>
          </div>

          
          <div 
            className="p-6 rounded-xl bg-white/70 backdrop-blur-xl shadow hover:shadow-lg transition cursor-pointer transform hover:-translate-y-2 hover:shadow-xl"
            onClick={onNavigateToSocial}
          >
            <h3 className="text-xl font-semibold text-red-500">👥 Social Connector</h3>
            <p className="text-red-400 mt-2">Meet classmates, collaborate, and build study circles.</p>
          </div>
          <div className="p-6 rounded-xl bg-white/70 backdrop-blur-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-500">🤝 Collaboration Hub</h3>
            <p className="text-red-400 mt-2">Real-time tools for team projects and shared docs.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} className="max-w-6xl mx-auto p-8 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl space-y-6">
        <h2 className="text-4xl font-bold text-red-500">About Us</h2>
        <p className="text-red-400 text-lg">
          We are a passionate team of students and developers building tools to make student life easier, more connected, and more productive. Unisphere was born from the vision to bridge the gap between academics, collaboration, and social interaction in campus life.
        </p>
      </section>

      {/* Modal Overlay - Fixed positioning */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/50 backdrop-blur-md flex items-center justify-center z-50" style={{margin: 0, padding: 0}}>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-red-500">
                {modalType === 'signup' ? 'Sign Up' : 'Sign In'}
              </h2>
              <button
                onClick={closeModal}
                className="text-red-400 hover:text-red-600 text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {modalType === 'signup' && (
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                  />
                </div>
              )}
              
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                />
              </div>

              {modalType === 'signup' && (
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                  />
                </div>
              )}

              <button
                onClick={closeModal}
                className="w-full py-3 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                {modalType === 'signup' ? 'Create Account' : 'Enter'}
              </button>
            </div>

            <div className="mt-6 text-center">
              {modalType === 'signup' ? (
                <p className="text-red-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => setModalType('login')}
                    className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p className="text-red-400">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setModalType('signup')}
                    className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component

export default App;

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentRoom, setCurrentRoom] = useState({ name: '', type: '' });

  const navigateToSocial = () => {
    setCurrentPage('social');
  };

  const navigateToStudyAssistant = () => {
    setCurrentPage('study');
  };

  const navigateToHome = () => {
    setCurrentPage('landing');
  };

  const navigateToChat = (roomName, roomType) => {
    setCurrentRoom({ name: roomName, type: roomType });
    setCurrentPage('chatroom');
  };

  const navigateBackToSocial = () => {
    setCurrentPage('social');
  };

  return (
    <div>
      {currentPage === 'landing' ? (
        <LandingPage 
          onNavigateToSocial={navigateToSocial} 
          onNavigateToStudyAssistant={navigateToStudyAssistant} 
        />
      ) : currentPage === 'social' ? (
        <SocialConnectorPage 
          onBackToHome={navigateToHome} 
          onNavigateToChat={navigateToChat}
        />
      ) : currentPage === 'chatroom' ? (
        <ChatroomPage 
          roomName={currentRoom.name}
          roomType={currentRoom.type}
          onBackToSocial={navigateBackToSocial}
        />
      ) : (
        <StudyAssistantPage onBackToHome={navigateToHome} />
      )}
    </div>
  );
};