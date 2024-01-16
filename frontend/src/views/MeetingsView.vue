<script>
import axios from 'axios'

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
    async fetchMeetings() {
      this.meetings = (await axios.get('http://localhost:3000/meetings')).data
    }
  },
  mounted() {
    this.fetchMeetings()
  }
}
</script>

<template>
  <div>
    <h1>Meetings</h1>
    <ul>
      <li v-for="meeting in meetings" :key="meeting._id">
        <router-link :to="{ name: 'meeting', params: { id: meeting._id } }">
          {{ meeting.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
