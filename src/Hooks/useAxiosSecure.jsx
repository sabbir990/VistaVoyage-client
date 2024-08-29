import axios from 'axios'

const axiosSecure = axios.create({
    baseURL : 'https://vistavoyageserver.vercel.app'
})

export default function useAxiosSecure() {

  return axiosSecure;
}
