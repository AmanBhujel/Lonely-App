import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbox from '../components/chats/Chatbox';
import Loading from '../components/utills/Loading';
import Sidebar from '../components/Sidebar';
import ChatPageDropdown from '../components/chats/ChatPageDropdown';
import { tokenFunction } from '../components/utills/checkToken';

const ChatPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // -----------Function to check auth----------------
  useEffect(() => {
      tokenFunction(setLoading, navigate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });


  return (
    <div className="flex w-full h-screen justify-center items-center bg-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Sidebar mobileWidth={768} />
          <div className="w-full  flex flex-col items-center h-full z-20">
            <ChatPageDropdown isDropdownOpen={isDropdownOpen} handleButtonClick={handleButtonClick} dropdownRef={dropdownRef} navigate={navigate}/>
            <Chatbox />
          </div>
        </>
      )}
    </div>
  );
}; export default ChatPage;
