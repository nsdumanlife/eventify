<script>
import { useMeetingStore } from '@/stores/meeting'
import { mapActions } from 'pinia'

export default {
  name: 'MeetingsView',
  components: {},
  data() {
    return {
      meetings: []
    }
  },
  computed: {},
  methods: {
    ...mapActions(useMeetingStore, ['fetchMeetings'])
    // async fetchMeetings() {
    //   this.meetings = (await axios.get('http://localhost:3000/meetings')).data
    // }
  },
  async mounted() {
    this.meetings = await this.fetchMeetings()
  }
}
</script>

<template>
  <div>
    <h1>Meetings</h1>
    <ul>
      <li v-for="meeting in meetings" :key="meeting._id">
        <router-link :to="`/meeting/${meeting._id}`">
          {{ meeting.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
