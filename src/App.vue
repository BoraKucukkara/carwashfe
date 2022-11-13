<template>
  <div id="app" :class="this.screenSelector">
    <router-view name="top" class="grid-top"></router-view>
    <router-view name="side" class="grid-sidebar"></router-view>
    <router-view class="grid-main"></router-view>
    <footer class="grid-footer"></footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
        return {
          screenSelector: "",  
          routePath: ""
        }
    },
    methods: {
      classSelector() {
        this.routePath = this.$route.path
        if(this.routePath == "/login" ) {
          this.screenSelector = "login-control"
        } else {
          this.screenSelector = "dashboard"
        }
      },
      checkSession() {
        this.$store.dispatch("refreshToken")
      }
    },
    created() {
      this.classSelector()
    },
    beforeMount() {
      this.checkSession() 
    },
    watch: { // dedects route and changes layout class in DOM
      '$route' (){ 
        this.routePath = this.$route.path
        if(this.routePath == "/login" ) {
          this.screenSelector = "login-control"
        } else {
          this.screenSelector = "dashboard"
        }
      }
    }
}
</script>
<style>
@import url("@/styles/main.css");
</style>