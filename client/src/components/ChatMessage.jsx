import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import UserInfoModal from './UserInfor';
import GroupModalUpdate from './GroupUpdateModal';
import { useSelector } from 'react-redux';

const ChatMessage = () => {

  const [userInfoOpen, setUserInfoOpen] = React.useState(false);
  const handleOpenUserInfo = () => setUserInfoOpen(true);

  const { selectedChat } = useSelector((state) => state.selectedChat);

  return (
    <div className='flex-1 p-4'>
      {/* information header */}
      <div className='w-full h-10 bg-[#f5f5f5] flex flex-row items-center justify-between p-2'>
        <div>
          {/* chatname */}
          <span>{selectedChat && selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1].username}</span>
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
      {/* chat messages */}
      <div>

        {/* input messages user */}
        <div>

        </div>
      </div>
    </div>
  );
};


export default ChatMessage;