import {QuerySnapshot, query, collection, startAfter, getDocs, limit, where} from "firebase/firestore"
import {store} from "@remote/firebase"
import {BASE_URL, COLLECTIONS} from "@remote/init";
import {Home} from "@models/home";
import axios, {Method} from "axios";

export const createHome = async (home: any) =>{
    console.log("createHome"+JSON.stringify(home))
    try {
        const res = await axios({
            method: 'post' as Method,
            url: `${BASE_URL}/home`,
            data: home
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const createHomeForm = async (home: any) =>{

    console.log("createHome: "+JSON.stringify(home))
    /*const response = await axios.post(`${baseURL}/home/form`, {
        "home": home
    }, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });*/
    try {
        const res = await axios({
            method: 'post' as Method,
            url: `${BASE_URL}/home/form`,
            data: home,
            headers: {
                'Content-Type':'multipart/form-data',
            },
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export async function getMainHomes(keyword: string){
    console.log(`${BASE_URL}/home?homeAddr=${keyword}&limit=3`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home?homeAddr=${keyword}&limit=3`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}


export async function getHomes(keyword: string){
    console.log(`${BASE_URL}/home?homeAddr=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home?homeAddr=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export async function getHomeName(keyword: string){
    console.log(`${BASE_URL}/home?name=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home?name=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export async function getHomeSearch(keyword: string){
    keyword = encodeURI(keyword)
    console.log(`${BASE_URL}/home?search=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home?search=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}


export async function getHomeBySer(homeSer: string){
    console.log(`${BASE_URL}/home/${homeSer}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home/${homeSer}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}


export async function getGroupHomes(keyword: string){
    console.log(`${BASE_URL}/home/group?homeAddr=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home/group?homeAddr=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export async function getNameGroupHomes(keyword: string){
    console.log(`${BASE_URL}/home/group?name=${keyword}`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/home/group?name=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}


export const deleteHome = async (uid: string) =>{
    try {
        const res = await axios({
            method: 'delete' as Method,
            url: `${BASE_URL}/home/${uid}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}

export const stopHome = async (uid: string, delYn: string ) =>{
    try {
        const res = await axios({
            method: 'put' as Method,
            url: `${BASE_URL}/home/${uid}/stop-home?delYn=${delYn}`
            //url: `https://www.muchon.net/univ?univName=${keyword}`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}
