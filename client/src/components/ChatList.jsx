import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ChatCard from './ChatCard';
const ChatList = () => {

  return (
    <div className='min-w-[320px] w-1/4 border-r p-4 h-full'>
      {/* header */}
      <div className='w-full flex flex-row justify-between algin-center'>
        <Typography variant="h6" component="h6">
          Chats
        </Typography>
        <Button variant="outlined" endIcon={<AddCircleOutlineOutlinedIcon />}>
          Delete
        </Button>
      </div>
      {/* chatslist */}
      <div className='w-full p-2 bg-[#ECEFF1] h-full max-h-full flex flex-col items-center justify-start gap-2 overflow-y-auto'>
        {chatListDynamic.map(({ id, Message, username, Time }) =>
          <ChatCard id={id} Message={Message} username={username} Time={Time} />
        )}
      </div>

    </div>
  );
};
export default ChatList;

const chatListDynamic = [
  {
    id: 1,
    username: "Sheryar Ahmed",
    Time: "12:19 PM",
    Message: "I will go to New York, Japan or German only as I am a tech person.",
  },
  {
    id: 2,
    username: "Alice Johnson",
    Time: "01:45 PM",
    Message: "Exploring new opportunities and challenges!",
  },
  {
    id: 3,
    username: "Bob Smith",
    Time: "03:22 PM",
    Message: "Just finished a great coding session. Feeling productive!",
  },
  {
    id: 4,
    username: "Elena Rodriguez",
    Time: "05:10 PM",
    Message: "Working on a cool project. Can't wait to share it with you all!",
  },
  {
    id: 5,
    username: "David Lee",
    Time: "07:55 PM",
    Message: "Anyone up for a coding challenge?",
  },
  {
    id: 6,
    username: "Sophie Williams",
    Time: "09:30 PM",
    Message: "Learning new technologies is always exciting!",
  },
  {
    id: 7,
    username: "Michael Brown",
    Time: "11:12 PM",
    Message: "Late-night coding session. The best time for creativity!",
  },
  {
    id: 8,
    username: "Olivia Taylor",
    Time: "01:02 AM",
    Message: "Dreaming big and working hard to make it happen!",
  },
  {
    id: 9,
    username: "Daniel Kim",
    Time: "03:41 AM",
    Message: "Coding is my passion. Every line of code tells a story!",
  },
  {
    id: 7,
    username: "Michael Brown",
    Time: "11:12 PM",
    Message: "Late-night coding session. The best time for creativity!",
  },
  {
    id: 8,
    username: "Olivia Taylor",
    Time: "01:02 AM",
    Message: "Dreaming big and working hard to make it happen!",
  },
  {
    id: 9,
    username: "Daniel Kim",
    Time: "03:41 AM",
    Message: "Coding is my passion. Every line of code tells a story!",
  },
];