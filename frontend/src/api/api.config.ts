import axios from 'axios';

const baseUrl = 'http://localhost:5002/api/';

export const axiosInstance = axios.create({
   baseURL: baseUrl,
});
