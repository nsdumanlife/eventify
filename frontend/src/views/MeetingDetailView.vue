<script>
import { useMeetingStore } from '@/stores/meeting'
import { mapActions } from 'pinia'

export default {
  name: 'MeetingDetailView',
  components: {},
  data() {
    return {
      meeting: {},
      loading: true
    }
  },
  computed: {},
  methods: {
    ...mapActions(useMeetingStore, ['fetchMeeting'])
  },
  async created() {
    this.meeting = await this.fetchMeeting(this.$route.params.id)
    this.loading = false
  }
}
</script>

<template lang="pug">
div(v-if="loading")
  h1 Loading...

div(v-else)
  h2 {{ meeting.name }}

  section
    h3 Date and Time
    p {{ meeting.date }} - {{ meeting.time }}

    h3 Location
    p {{ meeting.location }}

    h3 Description
    p {{ meeting.description }}

    h3 Attendees ({{ meeting.attendees.length }}) number of attendees will be here

</template>

<style scoped>
section {
  max-width: 800px;
  margin: 2rem auto;
  background-color: var(--color-background-mute);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--color-heading);
  border-bottom: 2px solid var(--color-divider);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

p {
  color: var(--color-text-2);
  line-height: 1.6;
}
</style>
