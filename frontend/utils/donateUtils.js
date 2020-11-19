import axios from 'axios'
import { API_URL } from './constants'
export const manageDonate = async (token, values) => {
  if (token && values) {
    try {
      const res = await axios.post(
        `${API_URL}/donates`,
        JSON.stringify(values),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (res.statusText !== 'OK') {
        throw new Error('Response bad, status text is not OK')
      }
      const response = await res.data
      return response
    } catch (err) {
      console.error(err)
    }
  }
  return null
}

export const getLastDonate = async (token) => {
  // const token = Cookie.get('token');
  if (token) {
    try {
      const res = await axios.get(`${API_URL}/donates/last`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (res.statusText !== 'OK') {
        throw new Error('Response bad, status text is not OK')
      }
      const response = await res.data
      return response
    } catch (err) {
      console.error(err)
    }
  }
  return null
}

export const provideDonate = async (values) => {
  if (values) {
    try {
      const res = await axios.post(
        `${API_URL}/donates/confirmed`,
        JSON.stringify(values),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (res.statusText !== 'OK') {
        throw new Error('Response bad, status text is not OK')
      }
      const response = await res.data
      return response
    } catch (err) {
      console.error(err.response.data)
      // console.error(err)
    }
  }
  return null
}