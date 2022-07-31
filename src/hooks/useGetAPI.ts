import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_NAME = process.env.REACT_APP_API_KEY_NAME;
const API_KEY = process.env.REACT_APP_API_KEY;

export const useGetAPI = (url: string) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const handleFetchData = () => {
    setIsLoaded(true);

    axios
      .get(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
          [`${API_NAME}`]: `${API_KEY}`,
        },
      })
      .then((response: AxiosResponse) => {
        setData(response.data);
        setIsLoaded(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return { error, isLoaded, data };
};