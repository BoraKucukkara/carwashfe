/* eslint-disable */
<template>
    <div class="login-control">
        <div class="login-container">
            <picture><img src="../assets/carwashcrm.jpg" /><div class="glass"></div></picture>
            <form @submit.prevent="submit">
                <p v-if="this.$store.state.logoutConfirm">{{this.$store.state.logoutConfirm.message}}</p>
                <h1>Login</h1>
                <input v-model="email" type="text">
                <input v-model="password" type="text">
                <button type="submit">Login <font-awesome-icon v-if="load" icon="fa-solid fa-spinner" spin/></button>
            </form>     
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
                email: "erich98@example.org",
                password: "123456789",
                load: false
        }
    },
    methods: {
        submit() {
            this.$store.dispatch("login", {email: this.email, password: this.password})
            this.load = true
        }
    }
}
</script>