<script>
import { mapActions } from 'pinia'
import { useMeetingStore } from '../stores/meeting.js'
import { RouterLink } from 'vue-router'

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
      .card
        .card-body
          h5.card-title {{meeting.name}}
          p.card-text {{meeting.location}}
          p.card-text {{meeting.date}}
          RouterLink.btn.btn-primary(:to="`/meetings/${meeting._id}`") View

</template>

<style scoped>
.card {
  margin-bottom: 1rem;
  width: 18rem;
}

li {
  list-style: none;
}
</style>
