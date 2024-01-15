import axios, {Method} from "axios";
import {BASE_URL} from "@constants/collection";

const REST_API_KEY = "3146eccdc2aeec4b00eb16139b35fd70"

export const getUserAll = async (keyword = '') => {
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `${BASE_URL}/user`
            /*url: `ec2-3-34-129-47.ap-northeast-2.compute.amazonaws.com:8000/${endpoint}`,*/
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};

export const getKaKaoLocateAll = async (keyword = '') => {
    console.log(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`+", "+`${process.env.KAKAO_REST_API}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
            //url: `https://www.muchon.net/univ?univName=${keyword}`
            headers: {
                Authorization: `KakaoAK 3146eccdc2aeec4b00eb16139b35fd70`,
            },
        });
        return res.data.documents;
    } catch (error) {
        console.log(error);
    }
};

export const getUnivAll = async (keyword = '') => {
    console.log(`${BASE_URL}/univ?univName=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `${BASE_URL}/univ?univName=${keyword}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (id = '') => {
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `${BASE_URL}/user/${id}/me`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};

export const getUnivById = async (id = '') => {
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `${BASE_URL}/user/${id}/univ`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};

export const getExistsByUsername = async (nime: string = '') =>{
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `${BASE_URL}/user/check/${nime}/exists`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const joinUser = async (user: any) =>{
    try {
        const res = await axios({
            method: 'post' as Method,
            url: `${BASE_URL}/user`,
            data: user
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (uid: string) =>{
    try {
        const res = await axios({
            method: 'delete' as Method,
            url: `${BASE_URL}/user/${uid}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserUniv = async (uid: string, univZipCd: string ) =>{
    console.log("last updateUserUniv")
    try {
        const res = await axios({
            method: 'put' as Method,
            url: `${BASE_URL}/user/${uid}/update-univ?univZipCd=${univZipCd}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const incrementPoint = async (uid: string, point: number ) =>{
    console.log(`${BASE_URL}/user/${uid}/increment-point?point=${point}`)
    try {
        const res = await axios({
            method: 'put' as Method,
            url: `${BASE_URL}/user/${uid}/increment-point?point=${point}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const decrementPoint = async (uid: string, point: number ) =>{
    try {
        const res = await axios({
            method: 'put' as Method,
            url: `${BASE_URL}/user/${uid}/decrement-point?point=${point}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}