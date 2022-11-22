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
      }
    },
    created() {
      this.classSelector()
    },
    beforeCreate() {
     // return this.$store.dispatch("refreshToken") // burada sıkıntı var 
    },
    watch: { // watches route and changes layout class in DOM
      '$route' (){
        this.routePath = this.$route.path
        if(this.routePath == "/login" ) {
          this.screenSelector = "login-control"
        } else {
          this.screenSelector = "dashboard"
          this.$store.commit("pushMessage", "")
          this.$store.commit("pushError", "")
          localStorage.setItem("route", this.routePath)
        }
      }
    }
}
</script>
<style>
@import url("@/styles/main.css");
</style>