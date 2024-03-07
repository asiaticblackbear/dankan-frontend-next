import { BASE_URL} from '@remote/init'
import axios, { Method } from 'axios'

export async function getAds(){
    console.log(`${BASE_URL}/ads?useYn=Y`)
    try {
        const res = await axios({
            method: 'get' as Method,
            //url: `${baseURL}/home`
            url: `${BASE_URL}/ads?useYn=Y`
        });
        return res.data.elements;
    } catch (error) {
        console.log(error);
    }
}