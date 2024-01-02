import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {

    const [errors, setErrors] = useState(null);

    const doRequest = async (props) => {
        setErrors(null);
        try {
            const { data } = await axios[method](url, { ...body, ...props });
            onSuccess(data);
            return data;
        } catch (error) {
            setErrors(error.ressponse?.data)
        }
    };
    
    return [doRequest, errors];

}

export default useRequest;