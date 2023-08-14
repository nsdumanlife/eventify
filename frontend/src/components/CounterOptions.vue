<script>
export default {
  name: 'CounterOptions',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
</script>

<template lang="pug">
div
  h1 Counter
  p {{ count }}
  button(@click="increment") +
  button(@click="decrement") -
</template>

<style lang="scss" scoped></style>
