import Vue from 'vue'
import axios from 'axios'
import router from '../router'
const Server = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

Server.interceptors.request.use(
  (config) => {
    console.log(config, 'config')
    console.log(router, 'router')
    let token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Server.interceptors.response.use(
  (response) => {
    console.log(response, 'response')
    if (response.data.status === 401) {
      router.push('/login')
    }
    return response.data
  },
  (error) => {
    console.log(error, 'error')
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default Server
