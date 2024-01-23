import axios from "axios";
import { getCookie } from "./Cookies";

const checkToken = async () => {
    const token = getCookie("token");
    console.log(token, "token")
    const headers = {
        Authorization: token,
    };
    const response = await axios.get('http://localhost:5000/check-cookie', {
        headers
    });
    if (response.status === 200) {
        return true
    }
    return false
};

const tokenFunction = async (setIsLoading,navigate) => {
    try {
        const tokenVerify = await checkToken();
        console.log(tokenVerify);
        if (!tokenVerify) {
            navigate('/auth');
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        setIsLoading(false);
    }
};

export { checkToken, tokenFunction };