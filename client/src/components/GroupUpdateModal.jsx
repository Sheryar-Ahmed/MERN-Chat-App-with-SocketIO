import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChatCard from './ChatCard';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewMembersToGroupAction, LeftGroupAction, createGroupChat, removeFromGroup, renameGroupName, userSearch } from '../state/actions/chatActions';
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

export default function GroupModalInfo({ open, setOpen, groupInfo }) {
    const dispatch = useDispatch();
    const handleClose = () => setOpen(false);
    const [groupName, setGroupName] = React.useState("");
    const [selectedGroupMembers, setSelectedGroupMembers] = React.useState(groupInfo.users);
    const { user } = useSelector((state) => state.user)

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

    const handleGroupUser = (userto) => {
        if (selectedGroupMembers.includes(userto)) {
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
        dispatch(AddNewMembersToGroupAction({
            chatId: groupInfo._id,
            userId: userto.id,
            groupInfo,
            currentUserId: user.id,
            onSuccess: (data) => {
                console.log("add members to group chat", data);
                setSelectedGroupMembers([...selectedGroupMembers, userto]);
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
    const onDelete = (userto) => {
        dispatch(removeFromGroup({
            chatId: groupInfo._id,
            userId: userto.id,
            groupInfo,
            currentUserId: user.id,
            onSuccess: (data) => {
                console.log("remove from group", data);
                setSelectedGroupMembers(selectedGroupMembers.filter((select) => select.id != userto.id));
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

    const onLeftGroup = () => {
        dispatch(LeftGroupAction({
            chatId: groupInfo._id,
            userId: user.id,
            onSuccess: (data) => {
                console.log("remove from group", data);
                handleClose();
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


    const updateGroupNameHanlde = () => {
        dispatch(renameGroupName({
            chatId: groupInfo._id,
            groupName,
            groupInfo,
            currentUserId: user.id,
            onSuccess: (data) => {
                console.log("rename group", data);
                groupInfo.chatName = groupName;
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
                        {groupInfo.chatName}
                    </Typography>
                    <Box sx={{ width: 'full', display: 'flex', flexDirection: "row", gap: 1 }}>
                        <TextField
                            fullWidth
                            label="Group Name"
                            id="fullWidth"
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <Button onClick={updateGroupNameHanlde} variant='outlined'>Update</Button>
                    </Box>
                    <TextField
                        fullWidth label="Add Users to Group"
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
                    {users?.slice(0, 3).map((item) => <ChatCard username={item.username} onClick={() => handleGroupUser(item)} />)}
                    <Button color='error' variant="outlined" onClick={onLeftGroup}>Leave Group</Button>

                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
}
