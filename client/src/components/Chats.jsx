import React, { useEffect } from 'react';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authCheck } from '../state/actions/userAction';

const Chats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheck({
      onSuccess: (data) => {
        data && !data.isAuthenticated && navigate('/signin');
      },
      onFail: (errorMessage) => {
        toast.error("You need to login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }));
  }, []);

  return (
    <div className={`flex w-full justify-start items-start space-x-4 h-[95vh] max-h-[95vh]`}>
      <ChatList />
      <ChatMessage />
    </div>
  )
}

export default Chats;