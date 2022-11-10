<template>
    <div class="top-bar">
        <p class="logo"><font-awesome-icon icon="fa-solid fa-car"/> Car Wash CRM</p>
        <ul>
            <li v-if="this.$store.getters.isAuth !== ''">
                Welcome, {{this.$store.state.userAuth.user.name}}
            </li>
            <li><router-link to="/settings">Settings</router-link></li>
            <li><a href="#" @click="logout">Logout</a></li>
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