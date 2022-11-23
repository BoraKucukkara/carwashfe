/* eslint-disable */
<template>
    <div class="login-control">
        <div class="login-container">
            <picture><img src="../assets/carwashcrm.jpg" /><div class="glass"></div></picture>
            <form @submit.prevent="submit">
                <p class="logo"><font-awesome-icon icon="fa-solid fa-car"/> Car Wash CRM</p>
                <p v-if="this.$store.state.logoutConfirm">{{this.$store.state.logoutConfirm}}</p>
                <p v-if="this.userName !== ''">Welcome back, {{this.userName}}</p>
                <h1>Login</h1>
                <input v-model="email" type="text">
                <input v-model="password" type="password">
                <button type="submit">Login <font-awesome-icon v-if="load" icon="fa-solid fa-spinner" spin/></button>
                <p>Don't have an account? <a href="#" class="btn-sm">Register Here</a></p>   
            </form>
              
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
                email: "sipes.colby@example.net",
                password: "123456789",
                load: false,
                userName: ""
        }
    },
    methods: {
        submit() {
            this.$store.dispatch("login", {email: this.email, password: this.password})
            this.load = true
        },
        getLocalData() {
        this.$store.commit("getLocalData")
        },
        rememberAuth() { // when user leave dashboard without logout, this function will remember the user. 
            let storage = localStorage.getItem("userData")
            if (storage) {
                let lastUser = JSON.parse(storage)
                this.userName = lastUser.name
            }
        }
    },
    created() {
        this.rememberAuth()
        this.getLocalData()
    }
}
</script>