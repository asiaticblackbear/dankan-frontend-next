import axios, {Method} from "axios";

export const getData = async (endpoint = '') => {
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `ec2-3-34-129-47.ap-northeast-2.compute.amazonaws.com:8000/user`,
        });
        console.log("suc"+JSON.stringify(res))
        return res;
    } catch (error) {
        console.log(error);
    }
};