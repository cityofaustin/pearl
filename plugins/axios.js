import axios from 'axios'
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

const headers = {
  'Content-Type': 'application/json',
}

export default axios.create({
  baseURL: publicRuntimeConfig.cmsAPI,
  timeout: 1000,
  headers: headers,
});
