import React, { useEffect } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import TextField from '@mui/material/TextField';
import UserInfoModal from './UserInfor';
import GroupModalUpdate from './GroupUpdateModal';
import { useSelector } from 'react-redux';

const ChatMessage = () => {
  const [userInfoOpen, setUserInfoOpen] = React.useState(false);
  const handleOpenUserInfo = () => setUserInfoOpen(true);

  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { messages } = useSelector((state) => state.allMessages);
  const { user } = useSelector((state) => state.user);

  return (
    <div className='flex-1 p-4 h-[85vh]'>
      {/* information header */}
      <div className='w-full h-10 bg-[#f5f5f5] flex flex-row items-center justify-between p-2'>
        <div>
          {/* chatname */}
          <span>{selectedChat && selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users && selectedChat.users[1] && selectedChat.users[1].username}</span>
        </div>
        <div>
          {/* information user */}
          <RemoveRedEyeOutlinedIcon
            onClick={handleOpenUserInfo}
          />
          {!selectedChat ? (
            <span>I am not available</span>
          ) : selectedChat.isGroupChat ? (
            <GroupModalUpdate open={userInfoOpen} setOpen={setUserInfoOpen} groupInfo={selectedChat} />
          ) : (
            selectedChat.users && selectedChat.users[1] ? (
              <UserInfoModal open={userInfoOpen} setOpen={setUserInfoOpen} user={selectedChat.users[1]} />
            ) : (
              <span>No user information available</span>
            )
          )}
        </div>
      </div>
      <div className='w-full h-full flex flex-col items-start justify-between'>
        {/* chat messages */}
        <div className='w-full h-full flex flex-col items-start justify-start gap-2 p-2 max-h-[60vh] overflow-y-auto'>
          {messages?.map(
            (item) => <div
              key={item._id}
              className={`w-full flex flex-row
              ${user.id === item.sender.id
                  ?
                  'items-center justify-end'
                  :
                  'items-start'}`}
            >
              <span className={`p-2 rounded ${user.id === item.sender.id
                ?
                'bg-[#bbdefb]'
                :
                'bg-[#b2ebf2]'}`}>
                {item?.content}
              </span>
            </div>
          )}
        </div>
        {/* input messages user */}
        <div className='w-full flex flex-row justify-between items-center'>
          <TextField
            fullWidth
            id="standard-multiline-flexible"
            label="Start Typing Your Message..."
            multiline
            maxRows={2}
            variant="standard"
          />
        </div>
      </div>
    </div>
  );
};


export default ChatMessage;