import {QuerySnapshot, query, collection, startAfter, getDocs, limit, where} from "firebase/firestore"
import {store} from "@remote/firebase"
import {COLLECTIONS} from "@constants/collection";
import {Home} from "@models/home";

export async function getHomes(pageParam?: QuerySnapshot<Home>){
    const homeQuery = pageParam == null? query(collection(store, COLLECTIONS.HOME), limit(3))
        : query(collection(store, COLLECTIONS.HOME), startAfter(pageParam), limit(3))
    const snapshot = await getDocs(homeQuery)
    const lastVisible = snapshot.docs[snapshot.docs.length -1]
    const items = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...(doc.data() as Home),
    }))
    return { items, lastVisible }
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