import axios, {Method} from "axios";
import {BASE_URL} from "@constants/collection";



export const joinUniv = async (univ: any) =>{
    try {
        const res = await axios({
            method: 'post' as Method,
            url: `${BASE_URL}/univ`,
            data: univ
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}



export const deleteUniv = async (uid: string) =>{
    try {
        const res = await axios({
            method: 'delete' as Method,
            url: `${BASE_URL}/univ/${uid}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const stopUniv = async (uid: string, useYn: string ) =>{
    try {
        const res = await axios({
            method: 'put' as Method,
            url: `${BASE_URL}/univ/${uid}/stop-univ?useYn=${useYn}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const getUnivName = async (keyword = '') => {
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

export const getUnivAddr = async (keyword = '') => {
    console.log(`${BASE_URL}/univ?univAddr=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            url: `${BASE_URL}/univ?univAddr=${keyword}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
};