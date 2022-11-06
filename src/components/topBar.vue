<template>
    <div class="top-bar">
        <p class="logo"><font-awesome-icon icon="fa-solid fa-car" /> Car Wash CRM</p>
        <ul>
            <li v-if="this.$store.state.admin == true">{{this.$store.state.userName}}</li>
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