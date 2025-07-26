import axios from "axios";

const connectApi = axios.create({
  baseURL: String(import.meta.env.VITE_APP_BANGALO_APPLICATION_BACKEND_API),
  headers: {
    "Content-Type": "application/json",
    "x-api-key": String(import.meta.env.VITE_APP_BANGALO_APPLICATION_KEY),
  }
})

connectApi.interceptors.request.use((config) => {
  return config
})

connectApi.interceptors.response.use((config) => {
  const {
    data: {
      token
    }
  } = config

  if (token) {
    sessionStorage.setItem("token-user", token as string)
  }

  return config
})

export {
  connectApi as middlewareServiceBackend
}
