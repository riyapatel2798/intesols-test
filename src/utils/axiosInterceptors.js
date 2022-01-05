import axios from 'axios'
import Config from '../config'

const axiosInterceptors = axios.create({
 baseURL: Config.API_DOMAIN,
  timeout: 35000,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer',
  },
})

axiosInterceptors.interceptors.response.use(
  function onSuccess(response) {
    return response.data
  },
  function onError(error) {
    if (!error.response) {
     alert("Something Went Wrong")
    }
    if (error && error.response && error.response.status) {
      if (error.response.status === 401) {
        if (error.response.data.message === 'Unauthenticated.') {
      
        }
      } else if (error.response.status === 404) {
          window.location.replace("/404")
      } else if (error.response.status === 500) {
      
      }
    }
    return Promise.reject(error)
  }
)

export { axiosInterceptors }
