<template>
    <div>
        
        <ul class="job-list">
            <h3><font-awesome-icon icon="fa-solid fa-soap"/> Washing in progress</h3>
            <li class="job-active" v-for="job in filterActive" :key="job.job_id">
                <div class=""><p class="plate-number">{{job.plate_number}}</p><p>{{job.customer.name}} {{job.customer.surname}}</p></div>
                <div><p>Type: {{job.vehicle_type.name}}</p><p>{{job.service.name}}</p></div>
                <h3>Price: ${{job.service.price}}</h3>
                <button class="btn btn-finish">Finish <font-awesome-icon icon="fa-solid fa-circle-check"/></button>
            </li>
        </ul>

        <ul class="job-list">
            <h3><font-awesome-icon icon="fa-solid fa-clock-rotate-left"/> Vehicles waiting in line</h3>
            <li class="" v-for="job in filterPending" :key="job.job_id">
                <div class=""><p class="plate-number">{{job.plate_number}}</p><p>{{job.customer.name}} {{job.customer.surname}}</p></div>
                <div><p>Type: {{job.vehicle_type.name}}</p><p>{{job.service.name}}</p></div>
                <h3>Price: ${{job.service.price}}</h3>
                <button class="btn btn-start">Start <font-awesome-icon icon="fa-solid fa-circle-check"/></button>
            </li>
        </ul>
        
        <ul class="job-list">
            <h3>Vehicles washed today</h3>
            <li class="" v-for="job in filterPassive" :key="job.job_id">
                <div class=""><p class="plate-number">{{job.plate_number}}</p><p>{{job.customer.name}} {{job.customer.surname}}</p></div>
                <div><p>Type: {{job.vehicle_type.name}}</p><p>{{job.service.name}}</p></div>
                <h3>Price: ${{job.service.price}}</h3>
                <button class="btn btn-archive">Archive <font-awesome-icon icon="fa-solid fa-circle-check"/></button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return{
        }
    },
    methods: {
    },
    computed:{ // Filter jobs by status
        filterActive(){
            return this.$store.state.jobData.data.filter(item =>{
                return item.status === 2 // 
            })
        },
        filterPending(){
            return this.$store.state.jobData.data.filter(item =>{
                return item.status === 1
            })
        },
        filterPassive(){
            return this.$store.state.jobData.data.filter(item =>{
                return item.status === 3
            })
        }

    },
    mounted() {
        return this.$store.dispatch("getJobList")
    }
}
</script>