import React from 'react'
import ChatHeader from '../chat-header/ChatHeader';
import MessageBar from '../message-bar/MessageBar';
import MessageContainer from '../message-container/MessageContainer';

const ChatContainer = () => {
  return (
    <div className='fixed top-0 h-screen w-screen bg-[#1c1d25] flex flex-col  md:flex-1 md:static'>
      <ChatHeader />
      <MessageContainer />
      <MessageBar/>
     </div>
    
  );
}

export default ChatContainer