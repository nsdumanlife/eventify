<script>
import { mapActions } from 'pinia'
import { useMeetingStore } from '../stores/meeting.js'

export default {
  name: 'MeetingsView',
  data() {
    return {
      meetings: []
    }
  },
  async created() {
    this.meetings = await this.fetchMeetings()
  },
  methods: {
    ...mapActions(useMeetingStore, ['fetchMeetings'])
  }
}
</script>

<template lang="pug">
div
  h1 Meetings
  ul
    li(v-for='meeting in meetings')
      p {{meeting.name}}
</template>

<style scoped></style>
