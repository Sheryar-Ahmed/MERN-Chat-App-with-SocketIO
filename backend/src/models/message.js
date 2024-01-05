const mongoose = require('mongoose');



const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    content: { type: String, time: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }
});


const Message = mongoose.model("Message", messageSchema);

export default Message;