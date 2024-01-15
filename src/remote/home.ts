import {QuerySnapshot, query, collection, startAfter, getDocs, limit, where} from "firebase/firestore"
import {store} from "@remote/firebase"
import {BASE_URL, COLLECTIONS} from "@constants/collection";
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

export async function getSearchHomes(keyword: string){
    const searchQuery = query(
        collection(store, COLLECTIONS.HOME),
        where("name", ">=", keyword),
        where("name", ">=", keyword+"\uf8ff")
    )
    const snapshot = await getDocs(searchQuery)
    const items = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...(doc.data() as Home),
    }))
    return items
}
