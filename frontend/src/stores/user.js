import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('user', {
  actions: {
    async signup(name, email, password) {
      await axios.post('/users', { name, email, password })
    }
  }
})
