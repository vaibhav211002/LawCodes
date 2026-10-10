import axios from 'axios'

export const apiBaseUrl = (
  import.meta.env.VITE_API_URL || 'https://lawcodes.onrender.com'
).replace(/\/+$/, '')

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
})

export default api
