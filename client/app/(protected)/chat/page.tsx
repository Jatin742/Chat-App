'use client';

import React from 'react'
import ContactsContainer from './components/contacts-container/ContactsContainer'
import EmptyChatContainer from './components/empty-chat-container/EmptyChatContainer'
import ChatContainer from './components/chat-container/ChatContainer'
import { useAppStore } from '@/store'
import { useRouter } from 'next/navigation'

const page = () => {
  const {userInfo, selectedChatType} = useAppStore();
  const router = useRouter();

  return (
    <div className='flex h-screen text-white overflow-hidden'>
      <ContactsContainer/>
      {selectedChatType ? <ChatContainer /> : <EmptyChatContainer />}
    </div>
  )
}

export default page