import NavbarShare from "@components/home/detail/NavbarShare"
import FormDetail from "@components/home/detail/FormDetail"
function HomeDetailPage(){
    return (
        <div>
            <NavbarShare/>
            <FormDetail onNext={()=>{}}/>
        </div>
    )
}

export default HomeDetailPage