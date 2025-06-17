import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Chatroom = () => {
  const { roomName, roomType } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // Handle undefined params
  const decodedRoomName = roomName ? decodeURIComponent(roomName) : 'Unknown Room';
  const decodedRoomType = roomType ? decodeURIComponent(roomType) : 'Unknown Type';
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      message: `Welcome to ${decodedRoomName}! This is the beginning of your ${decodedRoomType.toLowerCase()} conversation.`,
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(), // Use timestamp for unique ID
        sender: "You",
        message: newMessage.trim(),
        timestamp: new Date(),
        isSystem: false
      };
      setMessages(prevMessages => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleBackToSocial = () => {
    navigate('/social');
  };

  const formatTime = (timestamp) => {
    try {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return '00:00';
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
                {decodedRoomName}
              </h1>
              <p className="text-red-400 text-sm">{decodedRoomType}</p>
            </div>
          </div>
          <button 
            onClick={handleBackToSocial}
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
                <div key={`user-${index}`} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-red-50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.charAt(0).toUpperCase()}
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
                <div key={`msg-${msg.id}`} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
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
                    <p className="break-words">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isSystem ? 'text-red-400' : msg.sender === 'You' ? 'text-red-100' : 'text-red-400'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
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
                  maxLength={500}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

export default Chatroom;
