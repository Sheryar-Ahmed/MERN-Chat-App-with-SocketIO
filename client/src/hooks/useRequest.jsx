import BuildClient from '../utils/requestUrls';

const useRequest = ({ url, method, body, onSuccess, onFail }) => {


    const doRequest = async () => {
        try {
            const { data } = await BuildClient()[method](url, body);
            onSuccess(data);
            return data;
        } catch (error) {
            console.log("Errors in useRequest", error.response?.data);

            const errorMessage = error?.response?.data?.errors?.length > 0
                ? error?.response?.data?.errors[0]
                : error?.response?.data?.message;

            onFail(errorMessage);  // Pass the error message to onFail
        }
    };

    return [doRequest];
};

export default useRequest;
