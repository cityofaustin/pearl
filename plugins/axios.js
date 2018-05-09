import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
}
if (process.client) {
  headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
}

export default axios.create({
  baseURL: process.env.CMS_API,
  headers: headers,
})
