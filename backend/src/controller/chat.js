const Chat = require('../models/chat');
const User = require('../models/auth');

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

const allUserChats = async (req, res) => {
    try {
        const userId = req.currentUser.id;
        const allChats = await Chat.find({ 'users': userId })
            .populate("users")
            .populate("groupAdmin")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            ;
        const withLatestMessage = await User.populate(allChats, {
            path: "latestMessage.sender",
            select: "username email"
        })
        return res.status(200).json({
            success: true,
            userChats: withLatestMessage,
        })
    } catch (error) {
        console.log("Error occured during fetching of userchats", error);
        return res.status(500).json({
            success: false,
            message: "Something bad happened"
        });
    }
}

const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.groupName) {
        return res.status(400).json({
            message: "Please Fill out all the required fields first"
        })
    };

    const users = req.body.users;

    if (users.length < 2) {
        return res.status(400).json({
            message: "More than 2 users are can create a group"
        })
    };
    //current user is also the part of the group.
    users.push(req.currentUser.id);

    try {
        const chat = await Chat.create({
            chatName: req.body.groupName,
            users: users,
            isGroupChat: true,
            groupAdmin: req.currentUser.id
        });

        const FullChat = await Chat.findOne({
            _id: chat._id
        }).populate({
            path: "groupAdmin",
            model: "Users",
        })
            .populate({
                path: "users",
                match: { _id: { $ne: req.currentUser.id } }, // Exclude current user
                model: "Users",
            });
        return res.status(201).json({
            success: true,
            groupChat: FullChat
        })
    } catch (error) {
        console.log("Error occured during creation of a group chat", error);
        return res.status(500).json({
            success: false,
            message: "Something bad happened"
        });
    }

}


const renameGroupName = async (req, res) => {
    const { groupName, chatId } = req.body;

    if (!groupName || !chatId) {
        return res.status(400).json({
            message: "Please provide valid information"
        })
    };


    const updatedgroupName = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: groupName
        },
        {
            new: true
        }
    ).populate({
        path: "groupAdmin",
        model: "Users",
    }).populate({
        path: "users",
        match: { _id: { $ne: req.currentUser.id } }, // Exclude current user
        model: "Users",
    });


    if (!updatedgroupName) {
        return res.status(400).json({
            success: false,
            message: "Something bad happened during updation"
        });
    }
    return res.status(201).json({
        success: true,
        groupChat: updatedgroupName
    })
}


module.exports = { accessChat, allUserChats, createGroupChat, renameGroupName };
