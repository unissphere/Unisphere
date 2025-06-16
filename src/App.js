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