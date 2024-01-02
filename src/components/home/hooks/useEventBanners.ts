import {useQuery} from "react-query"
import {getEventBanners} from "@remote/banner";

function useEventBanners(){
    return useQuery(
        ["event-query"],
        ()=>getEventBanners({hasAccount: false}),
        {
            suspense: true,
        }
    )
}

export default useEventBanners