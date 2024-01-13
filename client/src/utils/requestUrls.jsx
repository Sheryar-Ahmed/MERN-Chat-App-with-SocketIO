import axios from "axios";


const HOST = 'http://localhost:3000';

export const loginURL = `/api/users/login`;
export const registerURL = `/api/users/register`;
export const chatUrl = `/api/chat/all`;
export const chatSearchUserUrl = `/api/chat/users`;
export const accessChatUrl = `/api/chat`;
export const createGroupChatURL = `/api/chat/group`;

const buildClient = () => {
    return axios.create({
        baseURL: HOST,
        withCredentials: true,
    });
};

export default buildClient;
