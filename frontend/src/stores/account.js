import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = (await axios.get('/accounts/session')).data
    },
    async login(email, password) {
      const response = await axios.post('/accounts/session', { email, password })
      this.user = response.data
    },
    async logout() {
      await axios.delete('/accounts/session')
      this.user = null
    }
  }
})
