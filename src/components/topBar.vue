<template>
    <div class="top-bar">
        <p class="logo"><font-awesome-icon icon="fa-solid fa-car" /> Car Wash CRM</p>
        <ul>
            <li v-if="this.$store.getters.isAuth !== ''">{{this.$store.state.userAuth.user.name + " " +  this.$store.state.userAuth.user.surname}}</li>
            <li>log out</li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return{
        }
    },
}

</script>