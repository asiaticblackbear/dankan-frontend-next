import {useQuery} from "react-query"
import {getExistsByUsername, joinUser} from "@remote/user";
import {getHomes} from "@remote/home";


export const existsByUsername = async (nime :string) => {
    const data = await getExistsByUsername(nime)
    /*if (!data.elements) {
        throw new Error('Failed to fetch data');
    }*/
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
}