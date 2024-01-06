const Chat = require('../models/chat');

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid data"
        });
    }

    const isChat = await Chat.findOne({
        isGroupChat: false,
        users: {
            $all: [req.currentUser.id, userId]
        }
    }).populate("users");

    if (isChat) {
        return res.status(200).json({
            success: true,
            isChat
        });
    }

    const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.currentUser.id, userId]
    };

    try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users")
        return res.status(201).json({
            success: true,
            FullChat
        });
    } catch (error) {
        console.error("Error occurred during chat creation", error);
        return res.status(500).json({
            success: false,
            message: "Something bad happened"
        });
    }
};

module.exports = { accessChat };
