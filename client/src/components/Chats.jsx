import React from 'react';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';

const Chats = () => {
  return (
    <div className='flex w-full justify-center items-center space-x-4'>
      <ChatList />
      <ChatMessage />
    </div>
  )
}

export default Chats;