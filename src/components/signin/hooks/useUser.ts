import {useQuery} from "react-query"
import {getExistsByUsername} from "@remote/user";


export const existsByUsername = async (nime :string) => {
    const data = await getExistsByUsername(nime)
    /*if (!data.elements) {
        throw new Error('Failed to fetch data');
    }*/
    return data.elements
};
