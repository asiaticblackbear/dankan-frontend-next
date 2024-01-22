import NavbarShare from "@components/home/detail/NavbarShare"
import FormDetail from "@components/home/detail/FormDetail"
import {useRouter} from "next/router";
import {getUserById} from "@remote/user";
import {getHomeBySer, getHomeName, getHomes} from "@remote/home";
import {useEffect, useState} from "react";
import {Home} from "@models/home";
function HomeDetailPage(){
    const router = useRouter();
    const homeSer = router.query?.id;
    const [home, setHome] = useState<Home | null>(null);
    const [homes, setHomes] = useState<Home[] | null>(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const queries = router.query; // 전달받은 쿼리 내용

    useEffect(() => {
        if (!router.isReady) return;
        console.log(queries)
        let homeSer = router.query?.id;
        console.log(homeSer)
        if(homeSer) getHomeObj(homeSer as string);

    }, [router.isReady])
    const getHomeObj = async (homeSer: string) =>{
        const obj = await getHomeBySer(homeSer)
        if(obj) getHomeList(obj)

    }

    const getHomeList = async (obj: Home) =>{
        const homes = await getHomeName(obj.name as string)
        calcEvaluation(obj, homes)
    }

   /* useEffect(() => {
        if(typeof window !== "undefined"){

        }
    },[])*/

    function calcEvaluation(obj: Home, list: Home[]){
        let count = list.length
        let homeTotal = 0;
        let homeTrfc = 0, homeClean = 0, homeFclty = 0, homeEnvrn = 0;
        for(let i=0; i<list.length; i++){
            console.log("for")
            let item = list[i] as Home
            homeTotal += item.homeTotal||0
            homeTrfc += item.homeTrfc||0
            homeClean += item.homeClean||0
            homeFclty += item.homeFclty||0
            homeEnvrn += item.homeEnvrn||0
        }
        console.log("총 평: "+homeTotal +"homeTrfc: "+ homeTrfc)
        homeTotal = homeTotal / count
        homeTrfc = ((homeTrfc / count) /3) * 100
        homeClean = ((homeClean / count) /3) * 100
        homeFclty = ((homeFclty / count) /3) * 100
        homeEnvrn = ((homeEnvrn / count) /3) * 100

        obj.homeTotal = homeTotal
        obj.homeTrfc = Math.ceil(homeTrfc)
        obj.homeClean = Math.ceil(homeClean)
        obj.homeFclty = Math.ceil(homeFclty)
        obj.homeEnvrn = Math.ceil(homeEnvrn)
        setHome(obj)
        setHomes(list)
        console.log("총 평: "+homeTotal+" homeTrfc: "+homeTrfc)
        //setValue(star)
    }

    return (
        <div>
            <NavbarShare homeSer={home?.name as string}/>
            <FormDetail obj={home as Home} list={homes as []} onNext={()=>{}}/>
        </div>
    )
}

export default HomeDetailPage