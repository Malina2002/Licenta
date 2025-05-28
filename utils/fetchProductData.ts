// utils/fetchProductData.ts
import axios from 'axios';

export async function fetchProductData(code: string) {
  try {
    const response = await axios.get(`https://world.openbeautyfacts.org/api/v0/product/${code}.json`);
    return response.data;
  } catch (error) {
    return null;
  }
}
