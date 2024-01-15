import NavbarShare from "@components/home/detail/NavbarShare"
import FormDetail from "@components/home/detail/FormDetail"
import {useRouter} from "next/router";
import {getUserById} from "@remote/user";
import {getHomeBySer, getHomes} from "@remote/home";
import {useEffect, useState} from "react";
import {Home} from "@models/home";
function HomeDetailPage(){
    const router = useRouter();
    const homeSer = router.query?.homeSer;
    const [home, setHome] = useState<Home | null>(null);
    const [homes, setHomes] = useState<[] | null>(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    console.log("homeSer", router.query.homeSer)


    const getHomeObj = async (homeSer: string) =>{
        const home = await getHomeBySer(homeSer)
        console.log("useEffect",JSON.stringify(home));
        setHome(home)
    }

    const getHomeList = async (homeAddr: string) =>{
        const homes = await getHomes(homeAddr)
        console.log("useEffect",JSON.stringify(homes));
        setHomes(homes)
    }

    useEffect(() => {
        if(homeSer) getHomeObj(homeSer as string);
        //const list = await getHomes((home.homeAddr).split(" ")[1])
        //setHomeList(list)
    },[homeSer])

    useEffect(() => {
        if(home) getHomeList((home.homeAddr as string).split(" ")[1])
        //const list = await getHomes((home.homeAddr).split(" ")[1])
        //setHomeList(list)
    },[home])

    /*useEffect(() => {
        console.log("useEffect"+setHome.homeAddr+" / "+ prvHome.homeAddr)
        const fnHomeList = async () => {
            const search: string = setHome.homeAddr!
            const list = await getHomes(addr.split(" ")[1])
            console.log("obj: "+JSON.stringify(list))
            setHomeCount((list.length))
            console.log("gg" + JSON.stringify(list))
            setData(list)
            setIsDataFetched(true)
        };
        if(!isDataFetched && setHome.homeAddr !==undefined){
            fnHomeList().then(

            );
        }

    },[])*/

    return (
        <div>
            <NavbarShare/>
            <FormDetail obj={home as Home} list={homes as []} onNext={()=>{}}/>
        </div>
    )
}

export default HomeDetailPage