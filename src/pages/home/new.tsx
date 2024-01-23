import {useEffect, useState} from "react";
import ProgressBar from "@components/common/ProgressBar"
import FormStep1 from "@components/home/new/FormStep1";
import NavbarBack from "@components/common/NavbarBack";
import useHomes from "@components/home/hooks/useHomes";
import FormStep2 from "@components/home/new/FormStep2";
import FormStep3 from "@components/home/new/FormStep3";
import FormStep4 from "@components/home/new/FormStep4";
import {useRouter} from "next/router";
import {Home} from "@models/home"
import {incrementPoint, joinUser} from "@remote/user";
import {User} from "@models/user";
import {createHome, createHomeForm} from "@remote/home";

const LAST_STEP = 3
const updateStateWithSpread = (setState: any, updatedValues: any) => {
    setState((prevState: any) => ({
        ...prevState,
        ...updatedValues,
    }));
};
function HomeNew(){
    const router = useRouter();
    const [step, setStep] = useState(0)
    const [point, setPoint] = useState(0)
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [id, setId] = useState("")
    let uid = router.query.uid;
    console.log(uid)

    useEffect(() => {
        if (typeof window !== "undefined") {
            uid = localStorage.getItem("uid") || uid
            setId(uid as string)
        }
    }, [])

    const [editHome, setEditHome] = useState({
        homeZipCd: "",
        name: "",
        homeG: "",
        per: 0,
        homeAddr: "",
        homeRoadAddr: "",
        cntn: "",
        inid: "",
        homeTotal: 0,
        homeTrfc: 0,
        homeClean: 0,
        homeFclty: 0,
        homeEnvrn: 0,
        filePath1: "",
        filePath2: "",
        filePath3: "",
    })

    const handleGroupChange = (value: string) => {
        setEditHome((prevUser) => ({
            ...prevUser,
            homeG: value,
        }));
    };
    const handlePerChange = (value: number) => {
        setEditHome((prevUser) => ({
            ...prevUser,
            homeTotal: value, // Assuming age is a number
        }));
    };

    /*callback method*/
    const handleStep1 = (form: any) =>{
        console.log("return1:"+JSON.stringify(form))
        updateStateWithSpread(setEditHome,{
            name: form.name,
            homeAddr: form.homeAddr,
            homeRoadAddr: form.homeRoadAddr
        })
        /*handleNameChange(form.name)
        handleAddrChange(form.homeAddr)*/
        setStep(step+1)
    }
    const handleStep2 = (form: any) =>{
        console.log("return2:"+JSON.stringify(form))
        updateStateWithSpread(setEditHome,{
            homeG: form.homeG,
            per: form.per
        })
        console.log("return22:"+JSON.stringify(editHome))
        /*handleNameChange(form.name)
        handleAddrChange(form.homeAddr)*/
        setStep(step+1)
    }

    const handleStep3 = (form: any, myPoint: number, imageFiles: File[]) =>{
        console.log("return3:"+JSON.stringify(form)+"point:"+point+"uid: "+id)
        updateStateWithSpread(setEditHome,{
            cntn: form.cntn,
            homeTotal: form.homeTotal,
            homeTrfc: form.homeTrfc,
            homeClean: form.homeClean,
            homeFclty: form.homeFclty,
            homeEnvrn: form.homeEnvrn,
            inid: id||"",
            filePath1: "",
            filePath2: "",
            filePath3: "",
        })
        setPoint(myPoint)
        setImageFiles(imageFiles)
        console.log("return33:"+JSON.stringify(editHome)+"point:"+myPoint+ "imageFiles size:"+imageFiles.length)
        /*handleNameChange(form.name)
        handleAddrChange(form.homeAddr)*/
        setStep(step+1)
    }

    const handleStep4 = (obj: Home, myPoint: number, images: File[]) =>{
        console.log("return44:"+JSON.stringify(obj))
        create(obj, myPoint, images)
    }

    async function create(obj: Home, myPoint: number, images: File[]) {
        console.log("last: "+JSON.stringify(obj)+myPoint+images.length)

        const objForm: FormData = new FormData();
        images.forEach((image) => {
            if (image instanceof File && image.size > 0) {
                objForm.append("files", image);
            }
        });
        objForm.append("home", new Blob([JSON.stringify(obj)], {
            type: "application/json"
        }));
        /*for (let entry of objForm.entries()) {
            console.log(entry);
        }*/
        const data = await createHomeForm(objForm)
        console.log("create", JSON.stringify(data))

        await incrementPoint(id, point)
        if(data.id!==undefined){
            console.log(`/home/${data.id}`)
            router.replace(`/home/${data.id}`)
        }else{
            router.replace(`/`)
        }

    }

    return (
        <div>
            {step !==3 ? <NavbarBack title="후기 작성" onNext={()=>{
                if(step>=1) setStep(step-1)
                if(step==0) router.back()
            }}/>: null}

            {step !==3 ? <ProgressBar progress={step/LAST_STEP}/> : null}

            {step === 0 ? <FormStep1 onNext={handleStep1}/> : null}

            {step === 1 ? <FormStep2 setHome={editHome} onNext={handleStep2}/> : null}

            {step === 2 ? <FormStep3 setHome={editHome} onNext={handleStep3}/> : null}

            {step === 3 ? <FormStep4 setHome={editHome} setPoint={point} setImage={imageFiles} onNext={handleStep4}/> : null}
        </div>
    )
}

export default HomeNew