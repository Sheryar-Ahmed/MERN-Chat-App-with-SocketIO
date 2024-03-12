import React, { useEffect } from 'react';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import TextField from '@mui/material/TextField';
import UserInfoModal from './UserInfor';
import GroupModalUpdate from './GroupUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageAction } from '../state/actions/messageActions';
import { io } from 'socket.io-client';
import { HOST } from '../utils/requestUrls';

var socket, selectedChatCompare;

const ChatMessage = () => {

  const dispatch = useDispatch();
  const [userInfoOpen, setUserInfoOpen] = React.useState(false);
  const [typing, setTyping] = React.useState("");
  const [starttyping, setStartTyping] = React.useState(false);
  const [istyping, setisTyping] = React.useState(false);

  const [localMessages, setLocalMessages] = React.useState([]);
  const [socketConnected, setSocketConnected] = React.useState(false);
  const chatContainerRef = React.useRef(null);

  const handleOpenUserInfo = () => setUserInfoOpen(true);

  const { selectedChat } = useSelector((state) => state.selectedChat);
  const { messages } = useSelector((state) => state.allMessages);
  const { user } = useSelector((state) => state.user);

  const typingHanlder = (e) => {

    setTyping(e.target.value);

    if (!socketConnected) return;

    if (!starttyping) {
      setStartTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    //throtting or debounce funtion to stop
    let lastTypingTime = new Date().getTime();
    var timeLengthOut = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timeLengthOut && starttyping) {
        socket.emit("stop typing", selectedChat._id);
        setStartTyping(false);
      }
    }, [timeLengthOut]);

  }

  const sendMessageHanlder = (event) => {
    socket.emit("stop typing", selectedChat._id);
    if (event.key === 'Enter') {
      dispatch(sendMessageAction({
        content: typing,
        chatId: selectedChat._id,
        onSuccess: (data) => {
          setTyping("");
          setLocalMessages([...localMessages, data.message]); // Update local state
          console.log("send messages", data)
          socket.emit("new message", data.message);
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
    }

  };

  useEffect(() => {
    setLocalMessages([]);
    selectedChatCompare = selectedChat;
    socket = io(HOST);
    socket.emit("setup", user);  // Emit the "setup" event with user data
    socket.on("connected", () => setSocketConnected(true));
    socket.emit("join chat", selectedChat._id);
    socket.on('typing', () => setisTyping(true));
    socket.on('stop typing', () => setisTyping(false));

  }, [selectedChat]);

  useEffect(() => {
    socket.on("message Received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        //give notification
        console.log("notifications");
      } else {
        setLocalMessages([...localMessages, newMessageReceived]);
      }
    });
  });


  // Scroll to the bottom when messages change
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, localMessages]);

  return (
    <div className='flex-1 p-4 h-[85vh]'>
      {/* information header */}
      <div className='w-full h-10 bg-[#f5f5f5] flex flex-row items-center justify-between p-2'>
        <div>
          {/* chatname */}
          <span>{selectedChat && selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users && selectedChat?.users?.filter((item) => item.id !== user.id)[0].username}</span>
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
              <UserInfoModal open={userInfoOpen} setOpen={setUserInfoOpen} user={selectedChat?.users?.filter((item) => item.id !== user.id)[0]} />
            ) : (
              <span>No user information available</span>
            )
          )}
        </div>
      </div>
      <div className='w-full h-full flex flex-col items-start justify-between'>
        {/* chat messages */}
        <div
          ref={chatContainerRef}
          className='w-full h-full flex flex-col items-start justify-start gap-2 p-2 max-h-[70] overflow-y-auto'
        >
          {[...messages, ...localMessages]?.map(
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
        {/* typing indicator */}
        <div>
          {istyping ? <span>TYping...</span> : <></>}
        </div>
        {/* input messages user */}
        <div className='w-full flex flex-row justify-between items-center'>
          <TextField
            fullWidth
            id="standard-multiline-flexible"
            label="Start Typing Your Message..."
            multiline
            maxRows={2}
            onChange={typingHanlder}
            value={typing}
            onKeyPress={sendMessageHanlder}
            variant="standard"
          />
        </div>
      </div>
    </div>
  );
};


export default ChatMessage;