<style>
html {
  background-color: lightgrey;
}
body {
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import CreateEvent from './components/CreateEvent'
export default {
  created () {
    console.log('Created!')
  },
  data: () => ({
  }),
  components: {
  }
}
</script>
