<script>
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'

export default {
  name: 'signup',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async submitSignup() {
      await this.signup(this.name, this.email, this.password)
      this.$router.push('/login')
    }
  }
}
</script>

<template lang="pug">
.signup
  h1 Sign up
  form(@submit.prevent="submitSignup")
    label(for="name") Name
    input#name(v-model="name" type="text" required)
    label(for="email") Email
    input#email(v-model="email" type="email" required)
    label(for="password") Password
    input#password(v-model="password" type="password" required)
    button(type="submit") Sign up

</template>

<style lang="scss" scoped></style>
