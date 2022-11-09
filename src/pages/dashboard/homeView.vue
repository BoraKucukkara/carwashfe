<template>
    <div class="page-fade-up dashboard">
        <top-bar />
        <side-bar />
        <main>
            <h1>Başarıyla giriş yaptınız</h1>
            <p>Daily Schedule</p>
            <p></p>
        </main>
    </div>
</template>
<script>
import sideBar from "../../components/sideBar.vue"
import topBar from "../../components/topBar.vue"
//import axios from "axios"
export default {
    data() {
        return {
            auth: {},
        }
        
    },
    components: {
        sideBar,
        topBar
    },
    methods: {
    },
    created() {

    }
}
</script>