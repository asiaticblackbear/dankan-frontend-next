import { BASE_URL } from '@constants/collection'
import axios, { Method } from 'axios'



export const joinArea = async (area: any) =>{
  try {
    const res = await axios({
      method: 'post' as Method,
      url: `${BASE_URL}/area`,
      data: area
      //url: `https://www.muchon.net/univ?univName=${keyword}`
    });
    return res.data.elements;
  } catch (error) {
    console.log(error);
  }
}


export const getAreaById = async (cifNo: string) => {
  console.log(`${BASE_URL}/area/${cifNo}`)
  try {
    const res = await axios({
      method: 'get' as Method,
      url: `${BASE_URL}/area/${cifNo}`
      //url: `https://www.muchon.net/univ?univName=${keyword}`
    });
    ///console.log(JSON.stringify(res.data.elements))
    return res.data.elements;
  } catch (error) {
    console.log(error);
  }
};
