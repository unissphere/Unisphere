import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
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

  const navigateToSocial = () => {
    navigate('/social');
  };

  const navigateToStudyAssistant = () => {
    navigate('/study');
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
          onClick={navigateToStudyAssistant}>
            <h3 className="text-xl font-semibold text-red-500">📚 Study Assistant</h3>
            <p className="text-red-400 mt-2">AI-powered study organizer, notes, and schedule builder.</p>
          </div>

          <div 
            className="p-6 rounded-xl bg-white/70 backdrop-blur-xl shadow hover:shadow-lg transition cursor-pointer transform hover:-translate-y-2 hover:shadow-xl"
            onClick={navigateToSocial}
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

      {/* Modal Overlay */}
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

export default LandingPage;