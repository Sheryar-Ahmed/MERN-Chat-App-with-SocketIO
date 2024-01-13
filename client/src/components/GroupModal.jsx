import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChatCard from './ChatCard';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupChat, userSearch } from '../state/actions/chatActions';
import { toast, ToastContainer } from 'react-toastify'
import UserBadge from './UserBadge';


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

export default function GroupModal({ open, setOpen }) {
    const dispatch = useDispatch();
    const handleClose = () => setOpen(false);
    const [groupName, setGroupName] = React.useState("");
    const [selectedGroupMembers, setSelectedGroupMembers] = React.useState([]);

    const handleSearch = (e) => {
        dispatch(userSearch({
            keyword: e.target.value,
            onSuccess: (data) => {
                console.log("search users data for group chat", data)
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
    const { users, loading } = useSelector((state) => state.searchUsers);

    const handleGroup = (user) => {
        if (selectedGroupMembers.includes(user)) {
            toast.error("User Already Added", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        setSelectedGroupMembers([...selectedGroupMembers, user])
    };
    const onDelete = (user) => {
        setSelectedGroupMembers(selectedGroupMembers.filter((select) => select.id != user.id));
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        console.log("hanldesubmit called")
        dispatch(createGroupChat({
            groupName,
            users: selectedGroupMembers,
            onSuccess: (data) => {
                console.log("created group chat", data)
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
    };



    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create a Group Chat
                    </Typography>
                    <TextField
                        fullWidth
                        label="Group Name"
                        id="fullWidth"
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <TextField
                        fullWidth label="Search Group Members"
                        id="fullWidth"
                        onChange={handleSearch}
                    />
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'cener',
                        flexWrap: 'wrap',
                        gap: '2px'
                    }}>
                        {selectedGroupMembers?.map((item) => <UserBadge id={item.id} username={item.username} onDelete={() => onDelete(item)} />)}
                    </Box>
                    {users?.slice(0, 3).map((item) => <ChatCard username={item.username} onClick={() => handleGroup(item)} />)}
                    <Button variant="outlined" onClick={handlesubmit}>Create Chat</Button>

                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
}
