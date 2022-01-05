import Config from "../config"
import { axiosInterceptors } from "./axiosInterceptors"

export const  GET = async (apiEndPoint) => {
  return await axiosInterceptors.get(apiEndPoint)
}

export const POST = async (apiEndPoint, data) => {
  return await axiosInterceptors.post(apiEndPoint)
}

export const DELETE = async (apiEndPoint) => {
  return await axiosInterceptors.delete(apiEndPoint)
}
export const  GET_WEATHER = async (cityName) => {
  return await axiosInterceptors.get(Config.WEATHER_API_DOMAIN + cityName)
}
