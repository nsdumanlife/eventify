<script>
import { useMeetingStore } from '../stores/meeting.js'
import { mapActions } from 'pinia'

export default {
  name: 'MeetingView',
  data() {
    return {
      meeting: {}
    }
  },
  async created() {
    this.meeting = await this.fetchMeeting(this.$route.params.id)
  },
  methods: {
    ...mapActions(useMeetingStore, ['fetchMeeting'])
  }
}
</script>

<template lang="pug">
div
  h1 {{meeting.name}}
  p Hosted By {{meeting.attendees[0].name}}

  h3 Details
  p {{meeting.description}}

  h3 Location
  p {{meeting.location}}

  h3 Date
  p {{meeting.date.}}

  h3 Attendees ({{meeting.attendees.length}})
  ul
    li(v-for='attendee in meeting.attendees')
      h5.card-title {{attendee.name}}

</template>

<style lang="scss" scoped></style>
