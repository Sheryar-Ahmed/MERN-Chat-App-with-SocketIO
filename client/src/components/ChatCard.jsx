import React from 'react';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const ChatCard = ({ username, Message, Time, id }) => {
    return (
        <div key={id} className='w-full p-2 border flex flex-row justify-center items-center gap-3'>
            {/* avatar */}
            <div className='w-1/5'>
                <Avatar
                    sx={{ width: 56, height: 56 }}
                    alt={username} src="/static/images/avatar/1.jpg"
                />
            </div>
            {/* chats and time */}
            <div className='w-4/5 flex flex-col'>
                <div className='w-full flex flex-row justify-between items-center'>
                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                            width: '80%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: 18,
                        }}
                    >
                        {username}
                    </Typography>

                    <Typography variant="h6" component="h6" style={{ width: '30%', fontSize: 14 }}>
                        {Time}
                    </Typography>

                </div>
                <div>
                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: 14,
                        }}
                    >
                        {Message}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default ChatCard;