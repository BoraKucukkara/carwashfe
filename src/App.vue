<template>
  <div id="app" class="page-fade-up">
    <topBar />
    <sideBar/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import sideBar from "./components/sideBar.vue"
import topBar from "./components/topBar.vue"
export default {
  name: 'App',
  components: {
    sideBar,
    topBar
  }
}
</script>
<style>
@import url("./styles/main.css");
</style>