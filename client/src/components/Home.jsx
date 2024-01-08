import React from 'react'
import Header from './Header';
import Chats from './Chats';

const Home = () => {

  return (
    <div className='w-full h-screen flex flex-col items-start justify-start'>
      <Header />
      <Chats />
    </div>
  )
}

export default Home