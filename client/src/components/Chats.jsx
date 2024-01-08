import React from 'react';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';

const Chats = () => {
  return (
    <div className={`flex w-full justify-start items-start space-x-4 h-[95vh] max-h-[95vh]`}>
      <ChatList />
      <ChatMessage />
    </div>
  )
}

export default Chats;