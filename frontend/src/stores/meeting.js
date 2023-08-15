import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useMeetingStore = defineStore('meeting', {
  state: () => {
    return {}
  },
  actions: {
    async fetchMeetings() {
      const response = await axios.get('/meetings')
      return response.data
    }
  }
})
