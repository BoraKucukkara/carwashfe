<template>
    <div class="top-bar">
        <p class="logo"><font-awesome-icon icon="fa-solid fa-car"/> Car Wash CRM</p>
        <ul>
            <li v-if="this.$store.getters.isAuth !== ''">
                Welcome, {{this.$store.state.userData.name}}
            </li>
            <li><router-link to="/settings"><font-awesome-icon icon="fa-solid fa-gear" /></router-link></li>
            <li><a href="#" @click="logout"><font-awesome-icon icon="fa-solid fa-power-off" /></a></li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return{
        }
    },
    methods:{
        logout() {
            this.$store.dispatch("logout")
        }
    } 
}
</script>