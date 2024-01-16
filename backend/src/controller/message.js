const Message = require('../models/message');
const User = require('../models/auth');
const Chat = require('../models/chat');

const messageCreation = async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        return res.status(400).json({
            success: false,
            message: "Invalid information"
        })
    };

    var newMessage = {
        sender: req.currentUser.id,
        content,
        chat: chatId
    }

    try {

        var message = await Message.create(newMessage);
        message = await message.populate("sender");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users'
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        });

        return res.status(201).json({
            success: true,
            message
        })


    } catch (error) {
        console.log("error occured during sending message", error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }

};




const allMessagesChat = async (req, res) => {
    const { chatId } = req.params;

    if (!chatId) {
        return res.status(400).json({
            success: false,
            message: "Invalid information"
        })
    };


    try {
        const messages = await Message.find({ chat: chatId })
            .populate("sender")
            .populate("chat");

        return res.status(200).json({
            success: true,
            messages
        })
    } catch (error) {
        console.log("error occured during retrievel of all message", error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }



}





module.exports = { messageCreation, allMessagesChat };