import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ChatCard from './ChatCard';
import { selectedChatAction, userChatList, selectChat } from '../state/actions/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import GroupModal from './GroupModal';
import { toast, ToastContainer } from 'react-toastify';
import { userDetails } from '../state/actions/userAction';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [selectedChatId, setSelectedChatId] = useState(null);
  const [openGroupChat, setOpenGroupChat] = useState(false);
  const handleGroupChatOpen = () => setOpenGroupChat(true);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [])
  useEffect(() => {
    dispatch(
      userChatList({
        onSuccess: (data) => {
          // Handle success logic, e.g., redirect or any other action
          console.log(data);
        },
        onFail: (errorMessage) => {
          // Handle failure logic, e.g., show an error message
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        },
      })
    );
    dispatch(
      userDetails({
        onSuccess: (data) => {
          // Handle success logic, e.g., redirect or any other action
          console.log(data);
        },
        onFail: (errorMessage) => {
          // Handle failure logic, e.g., show an error message
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        },
      })
    );
  }, [dispatch]);

  const { loading, chats } = useSelector((state) => state.chats);
  const { selectedChatId } = useSelector((state) => state.selectChat);

  const handleChatCardClick = (chatId) => {
    // setSelectedChatId(chatId === selectedChatId ? null : chatId);
    dispatch(selectChat(chatId));
    dispatch(selectedChatAction({
      chatId,
      chats,
      onSuccess: (data) => {
        console.log("data for user", data)
      },
      onFail: (errorMessage) => {
        // Handle failure logic, e.g., show an error message
        toast.error(errorMessage, {
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
  };

  return (
    <div className='min-w-[320px] w-1/4 border-r p-4 h-full'>
      {/* header */}
      <div className='w-full flex flex-row justify-between algin-center'>
        <Typography variant='h6' component='h6'>
          Chats
        </Typography>
        <Button
          onClick={handleGroupChatOpen}
          variant='outlined' endIcon={<AddCircleOutlineOutlinedIcon />}>
          New Group Chat
        </Button>
      </div>
      {/* GroupChat Creation Modal */}
      <GroupModal open={openGroupChat} setOpen={setOpenGroupChat} />
      {/* chatslist */}
      <div className='w-full mt-2 p-2 bg-[#ECEFF1] h-full max-h-full flex flex-col items-center justify-start gap-2 overflow-y-auto'>
        {chats?.map(({ _id, latestMessage, chatName, isGroupChat, users, Time }) => (
          <ChatCard
            id={_id}
            Message={latestMessage?.content}
            username={isGroupChat ? chatName : users.filter((item) => item.id !== user.id)[0].username}
            Time={Time}
            isSelected={selectedChatId === _id}
            onClick={() => handleChatCardClick(_id)}
          />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatList;
