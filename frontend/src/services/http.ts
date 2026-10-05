import axios from "axios"
import { ApiError } from "./api-errors"

export const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8090'
})

http.interceptors.response.use(undefined, (error) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return Promise.reject(new ApiError("NETWORK_ERROR", null, error.message))
    }
    const data = error.response.data
    return Promise.reject(
      new ApiError(data?.error ?? "UNKNOWN_ERROR", error.response.status, data?.message ?? error.message),
    )
  }
  return Promise.reject(error)
})
