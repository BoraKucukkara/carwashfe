/* eslint-disable */
<template>
    <div class="login-control page-fade-up">
        <form @submit.prevent="submit">
            <p v-if="this.$store.state.logoutConfirm">{{this.$store.state.logoutConfirm.message}}</p>
            <p>Login</p>
            <input v-model="email" type="text">
            <input v-model="password" type="text">
            <button type="submit">Login</button>    
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
                email: "test@test.test",
                password: "testtest",
        }
    },
    methods: {
        submit() {
            this.$store.dispatch("login", {email: this.email, password: this.password})
        }
    }
}
</script>