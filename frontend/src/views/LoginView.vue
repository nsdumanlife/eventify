<script>
import { useAccountStore } from '@/stores/account'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
div
  h1 Login
  p Login to your account
  form(@submit.prevent="doLogin")
    input(type="text" placeholder="Username" v-model="email" required)
    input(type="password" placeholder="Password" v-model="password" required)
    button(type="submit") Login
</template>

<style lang="scss" scoped></style>
