import axios, { AxiosResponse, AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_NAME = process.env.REACT_APP_API_KEY_NAME;
const API_KEY = process.env.REACT_APP_API_KEY;

const header = {
  method: 'GET',
  headers: {
    [`${API_NAME}`]: `${API_KEY}`,
  },
}

export const services = {
  getLocation: async (url: string) => {
    const response = await axios.get(`${API_URL}${url}`, header)
    return response;
  },
} 