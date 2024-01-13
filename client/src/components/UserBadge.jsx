import React from 'react';
import { Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const UserBadge = ({ id, username, onDelete }) => {
    return (
        <div
            key={id}
            className={`w-26 px-1 text-white flex flex-row justify-start items-start gap-0 bg-[#3f51b5]`}
        >
            <Typography
                variant='h6'
                component='h6'
                sx={{
                    width: '60px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 18,
                }}
            >
                {username}
            </Typography>
            <div>
                <ClearOutlinedIcon sx={{ cursor: 'pointer' }} fontSize='22px' onClick={onDelete} />
            </div>
        </div>
    );
};

export default UserBadge;