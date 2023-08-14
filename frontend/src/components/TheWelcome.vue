<script setup>
import axios from 'axios'
const { data: meetings } = await axios.get('http://localhost:3000/meetings')

import CounterOptions from './CounterOptions.vue'
</script>

<template lang="pug">
div
  CounterOptions
  h1 Meetings
  ul
    li(v-for="meeting in meetings" :key="meeting.id")
      | {{ meeting.name }}
</template>
