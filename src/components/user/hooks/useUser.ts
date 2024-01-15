import {useQuery} from "react-query"
import {getUserById} from "@remote/user";


function userById(uid: string){
    return useQuery(
        ["homes"],
        ()=>getUserById(),
        {
            suspense: true,
        }
    )
}

export default userById
/*
export const existsByUsername = async (nime :string) => {
    const data = await getExistsByUsername(nime)
    /!*if (!data.elements) {
        throw new Error('Failed to fetch data');
    }*!/
    return data.elements
};

export function joinDankan(user: any){
    return useQuery(
        ["joinUser"],
        ()=>joinUser(user),
        {
            suspense: true,
        }
    )
}*/
