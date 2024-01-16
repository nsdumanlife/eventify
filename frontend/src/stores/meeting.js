import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
// axios.defaults.baseURL = 'http://localhost:3000'

export const useMeetingStore = defineStore('meeting', {
  state: () => ({}),
  actions: {
    async fetchMeetings() {
      const meetings = (await axios.get('/meetings')).data

      return meetings
    },
    async fetchMeeting(id) {
      const meeting = (await axios.get(`/meetings/${id}`)).data

      return meeting
    }
  }
})
