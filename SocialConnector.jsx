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
