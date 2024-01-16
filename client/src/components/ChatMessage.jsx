import React, { useEffect } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
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
    <div className='flex-1 p-4'>
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
      <div className='w-full flex flex-col items-start justify-center'>
        {/* chat messages */}
        <div className='w-full h-full flex flex-col items-start justify-start gap-2 p-2'>
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
        <div>

        </div>
      </div>
    </div>
  );
};


export default ChatMessage;