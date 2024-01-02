import {useQuery} from "react-query"
import {getHomes} from "@remote/home";

function useHomes(){
    return useQuery(
        ["homes"],
        ()=>getHomes(),
        {
            suspense: true,
        }
    )
}

export default useHomes