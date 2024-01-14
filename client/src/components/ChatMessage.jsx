import React from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import UserInfoModal from './UserInfor';

const ChatMessage = () => {

  const [userInfoOpen, setUserInfoOpen] = React.useState(false);
  const handleOpenUserInfo = () => setUserInfoOpen(true);

  return (
    <div className='flex-1 p-4'>
      {/* information header */}
      <div className='w-full h-10 bg-[#f5f5f5] flex flex-row items-center justify-between p-2'>
        <div>
          {/* chatname */}
          <span>Demo of Youtube</span>
        </div>
        <div>
          {/* information user */}
          <RemoveRedEyeOutlinedIcon
            onClick={handleOpenUserInfo}
          />
          <UserInfoModal open={userInfoOpen} setOpen={setUserInfoOpen} />
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