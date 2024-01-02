import axios from "axios";


const HOST = 'http://localhost:3000';

export const loginURL = `/api/users/login`;
export const registerURL = `/api/users/register`;


const buildClient = () => {
    return axios.create({
        baseURL: HOST,
        withCredentials: true,
    });
};

export default buildClient;
