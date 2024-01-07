import axios, {Method} from "axios";

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8000"
    }
)


export const getUserAll = async (keyword = '') => {
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `http://localhost:8000/user?`
            /*url: `ec2-3-34-129-47.ap-northeast-2.compute.amazonaws.com:8000/${endpoint}`,*/
        });
        console.log(JSON.stringify(res))
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};

export const getUnivAll = async (keyword = '') => {
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `http://localhost:8000/univ?univName=${keyword}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        console.log(JSON.stringify(res))
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};