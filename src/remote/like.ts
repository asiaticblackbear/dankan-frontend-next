import { BASE_URL } from '@constants/collection'
import axios, { Method } from 'axios'


export const joinLikes = async (like: any) =>{
  try {
    const res = await axios({
      method: 'post' as Method,
      url: `${BASE_URL}/like/liked`,
      data: like
      //url: `https://www.muchon.net/univ?univName=${keyword}`
    });
    return res.data.elements;
  } catch (error) {
    console.log(error);
  }
}

export const joinDislikes = async (like: any) =>{
  try {
    const res = await axios({
      method: 'post' as Method,
      url: `${BASE_URL}/like/disliked`,
      data: like
      //url: `https://www.muchon.net/univ?univName=${keyword}`
    });
    return res.data.elements;
  } catch (error) {
    console.log(error);
  }
}

export const getLiked = async (homeSer: string, cifNo: string) => {
  console.log(`${BASE_URL}/like/${homeSer}/liked/${cifNo}`)
  try {
    const res = await axios({
      method: 'get' as Method,
      url: `${BASE_URL}/like/${homeSer}/liked/${cifNo}`
      //url: `https://www.muchon.net/univ?univName=${keyword}`
    });
    ///console.log(JSON.stringify(res.data.elements))
    return res.data.elements;
  } catch (error) {
    console.log(error);
  }
};
