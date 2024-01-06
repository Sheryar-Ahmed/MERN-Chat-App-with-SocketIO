const Chat = require('../models/chat');
const User = require('../models/auth');

const accessChat = async (req, res) => {
    //take the user id whom he wants to chat
    const { userId } = req.body;

    if (!userId) {
        res.status(400).json({
            success: false,
            message: "Invalid data"
        })
    }
    //check if the chat is already exits or not and as it is a one to one chat so groupchat becomes false

    const isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { req.currentUser.id } } },
            { users: { $elemMatch: { userId } } }
        ]
    }).populate("users")
        .populate("latestMessage");
    ;

    //take out the sender information

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "username email"
    });

    if (isChat.length > 0) {
        res.status(200).json({
            success: true,
            isChat: isChat[0]
        })
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.currentUser.id, userId]
        }
        try {
            const chat = await Chat.create(chatData).populate("users");
            return res.status(201).json({
                success: true,
                chat
            })
        } catch (error) {
            console.log("error occured during chat creation", error)
            return res.status(500).json({
                success: false,
                message: "Something bad happened"
            })
        }
    }

}






module.exports = { accessChat };