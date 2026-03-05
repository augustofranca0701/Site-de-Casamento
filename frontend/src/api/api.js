import axios from "axios"

const api = axios.create({
  baseURL: "https://site-de-casamento-1.onrender.com/api"
})

export default api