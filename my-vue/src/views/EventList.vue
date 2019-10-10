<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Previous Page</router-link
      >|
    </template>
    <template v-if="totalEvents >= 3 * page">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  props: {
    events: {
      type: Array,
      required: true
    },
    page: Number
  },
  components: {
    EventCard
  },
  computed: {
    totalEvents() {
      return parseInt(this.event.totalEvents)
    },
    ...mapState(['event', 'user'])
  }
}
</script>

<style scoped></style>
