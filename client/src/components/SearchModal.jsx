import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import ChatCard from './ChatCard';
import Avatar from '@mui/material/Avatar';
import { accessChat, selectChat } from '../state/actions/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, users }) {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const handleSearch = (user) => {
    dispatch(accessChat({
      userId: user.id,
      onSuccess: (data) => {
        console.log("Access chat", data)
        dispatch(selectChat(data.FullChat._id))
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
    handleClose();
  }
  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Results
          </Typography>
          {users.map((item) => <div
            key={item._id}
            onClick={() => handleSearch(item)}
            className={`w-full p-2 border flex flex-row justify-center items-center gap-3`}
          >
            {/* avatar */}
            <div className='w-1/5'>
              <Avatar sx={{ width: 56, height: 56 }} alt={item?.username} src='/static/images/avatar/1.jpg' />
            </div>
            <div className='w-4/5 flex flex-col'>
              <div className='w-full flex flex-row justify-between items-center'>
                <Typography
                  variant='h6'
                  component='h6'
                  sx={{
                    width: '80%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 18,
                  }}
                >
                  {item.username}
                </Typography>
              </div>
            </div>
          </div>)}
        </Box>
      </Modal>
    </div>
  );
}
