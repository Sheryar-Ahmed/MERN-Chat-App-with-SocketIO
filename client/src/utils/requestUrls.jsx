import axios from "axios";


export const HOST = 'http://localhost:3000';

export const loginURL = `/api/users/login`;
export const registerURL = `/api/users/register`;
export const userDetailsURL = `/api/users/me`;

export const chatUrl = `/api/chat/all`;
export const chatSearchUserUrl = `/api/chat/users`;
export const accessChatUrl = `/api/chat`;
export const createGroupChatURL = `/api/chat/group`;
export const renameGroupURL = `/api/chat/group/rename`;
export const addMembersToGroupURL = `/api/chat/group/add`;
export const removeFromGroupURL = `/api/message/group/remove`;
export const sendMessageURL = `/api/message`;  // POST
export const getAllMessagesURL = `/api/messages`;  // GET with the chatID

const buildClient = () => {
    return axios.create({
        baseURL: HOST,
        withCredentials: true,
    });
};

export default buildClient;
