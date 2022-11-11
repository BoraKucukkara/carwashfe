<template>
    <main class="page-fade-up">
        <h1>Welcome</h1>
        <p>Here is your daily schedule</p>
        <job-list/>
        <p>Monthly earnings</p>
    </main>
</template>
<script>
import jobList from "../../components/jobList.vue"
export default {
    data() {
        return {
            auth: {},
        }
        
    },
    components: {
        jobList
    },
    methods: {
    },
    created() {

    }
}
</script>