import Button from "@components/common/Button"
import {store} from "@remote/firebase"
import {collection, writeBatch, doc} from "firebase/firestore"
import {home_list} from "@/del/mock/home"
import {COLLECTIONS} from "@constants/collection"

function HomeListAddButton(){
    const handleButtonClick = async () => {
        const batch = writeBatch(store)

        home_list.forEach((banner) => {
            const bannerRef = doc(collection(store, COLLECTIONS.HOME))
            batch.set(bannerRef, banner)
        })

        await batch.commit()

        alert("매물 데이터가 추가되었습니다")
    }
    return <Button onClick={handleButtonClick}>매물 데이터 추가</Button>
}

export default HomeListAddButton