import NavbarAdmin from "@pages/admin/components/NavbarAdmin";
import HomeAdmin from "@pages/admin/home";
import UserAdmin from "@pages/admin/user";
import UnivAdmin from "@pages/admin/univ";
import {useState} from "react";

function TestPage() {
    const [step, setStep] = useState(0)
    const handleStep= (index: number) =>{
        console.log("TestPage", index)
        setStep(index)
    }

    return (
        <div style={{width:"100wh"}}>
            <NavbarAdmin onNext={handleStep}/>
            {step === 0 ? <HomeAdmin/> : null}
            {step === 1 ? <UserAdmin/> : null}
            {step === 2 ? <UnivAdmin/> : null}

        </div>
    )
}

export default TestPage