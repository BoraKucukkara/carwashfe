<template>
  <div id="app" class="dashboard">
    <router-view name="top"></router-view>
    <router-view name="side"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
        return {
        }
    },
    methods: {
    }
}
</script>
<style>
@import url("@/styles/main.css");
</style>