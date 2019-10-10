import axios from 'axios'
import NProgress from 'nprogress'

const apiClinet = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClinet.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClinet.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default {
  getEvents(perPage, page) {
    return apiClinet.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClinet.get('/events/' + id)
  },
  postEvent(event) {
    return apiClinet.post('/events', event)
  }
}
