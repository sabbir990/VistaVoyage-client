import axios from 'axios'

const axiosSecure = axios.create({
    baseURL : 'http://localhost:8000'
})

export default function useAxiosSecure() {

  return axiosSecure;
}
