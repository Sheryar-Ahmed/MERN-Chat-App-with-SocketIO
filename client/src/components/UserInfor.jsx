import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'
import { userDetails } from '../state/actions/userAction';

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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
};

export default function UserInfoModal({ open, setOpen, user }) {

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                        Your Profile
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Name: {user && user.username}
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Email: {user && user.email}
                    </Typography>

                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
}
