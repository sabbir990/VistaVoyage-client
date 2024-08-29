import axios from 'axios'
import React from 'react'

const axiosCommon = axios.create({
    baseURL : "http://localhost:8000"
})

export default function useAxiosCommon() {
  return axiosCommon
}
