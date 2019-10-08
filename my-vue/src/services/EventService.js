import axios from 'axios'

const apiClinet = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClinet.get('/events')
  },
  getEvent(id) {
    return apiClinet.get('/events/' + id)
  },
  postEvent(event) {
    return apiClinet.post('/events', event)
  }
}
