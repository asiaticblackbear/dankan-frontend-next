import {useQuery} from "react-query"
import {getHomes} from "@remote/home";

function useHomes(keyword: string){
    return useQuery(
        ["homes"],
        ()=>getHomes(keyword),
        {
            suspense: true,
        }
    )
}
export default useHomes