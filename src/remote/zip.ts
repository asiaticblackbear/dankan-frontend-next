import { BASE_URL } from '@constants/collection'
import axios, { Method } from 'axios'

export const getZipAll = async (reg1: string, reg2: string, reg3: string) => {
  console.log(`${BASE_URL}/zip?reg1=${reg1}&reg2=${reg2}&reg3=${reg3}`)
  try {
    const res = await axios({
      method: 'get' as Method,
      url: `${BASE_URL}/zip?reg1=${reg1}&reg2=${reg2}&reg3=${reg3}`
      //url: `https://www.muchon.net/univ?univName=${keyword}`
    });
    console.log(JSON.stringify(res.data.elements))
    return res.data.elements;
  } catch (error) {
    console.log(error);
  }
};
