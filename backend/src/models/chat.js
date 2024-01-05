const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    lastestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }

}, {
    timestamps: true
});


const Chat = mongoose.model("Chat", chatSchema);


export default Chat;