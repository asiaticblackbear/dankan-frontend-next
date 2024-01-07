import {useState} from "react";
import ProgressBar from "@components/ProgressBar"
import FormStep1 from "@components/home/new/FormStep1";
import NavbarBack from "@components/NavbarBack";
import useHomes from "@components/home/hooks/useHomes";
import FormStep2 from "@components/home/new/FormStep2";
import FormStep3 from "@components/home/new/FormStep3";
import FormStep4 from "@components/home/new/FormStep4";

const LAST_STEP = 3
function HomeNew(){
    const [step, setStep] = useState(2)
    const home = useHomes()
    return (
        <div>
            <NavbarBack/>
            <ProgressBar progress={step/LAST_STEP}/>
            {step === 0 ? <FormStep1 onNext={(keyword) => {
                console.log(keyword)
                setStep(step+1)
            }}
            /> : null}
            {step === 1 ? <FormStep2 onNext={(keyword) => {
                console.log(keyword)
                setStep(step+1)
            }}
            /> : null}
            {step === 2 ? <FormStep3 onNext={(keyword) => {
                console.log(keyword)
                setStep(step+1)
            }}
            /> : null}
            {step === 3 ? <FormStep4/> : null}
        </div>
    )
}

export default HomeNew