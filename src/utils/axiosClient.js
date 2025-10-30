import axios from 'axios'

// axios.create({}) -> This creates an instance so that we can use this configuration everywhere and no need to create oftenly.
const axiosClient = axios.create({
  baseURL: 'https://curriculum-portal-backend.vercel.app/',
  withCredentials: true ,
  headers: {
    'Content-Type' : 'application/json' ,
    Accept: 'application/json'
  }
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error.response?.data || error.message);
    }
);

export default axiosClient ;

// comment