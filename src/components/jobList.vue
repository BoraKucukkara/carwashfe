<template>
    <div>
         <div>
                <button class="btn-action" @click="jobform = true" >+ Add New Job</button>
                <p v-if="this.$store.state.feedbackMessage" class="successMessage" @click="closeFeedback()"><font-awesome-icon icon="fa-solid fa-circle-check"/> Job added succesfully</p>
                <add-job v-if="jobform" @isJobAdded="jobform = $event"/>
         </div>
        <ul class="job-list page-fade-up">
            <h3><font-awesome-icon icon="fa-solid fa-soap"/> Washing in progress</h3>
            <li class="job-active" v-for="job in filterActive" :key="job.job_id">
                <p class="plate-number">{{job.plate_number}}</p>
                <p>{{job.customer.name}} {{job.customer.surname}}</p>
                <strong>{{job.vehicle_type.name}}</strong>
                <strong>{{job.service.name}}</strong>
                <h3>Price: ${{job.service.price}}</h3>
                <div>
                    <a class="btn-sm" @click="deleteJob(job.job_id)"><font-awesome-icon icon="fa-solid fa-trash" /> Delete</a><br>
                    <a class="btn-sm" @click="updateJob(job.job_id)">Update</a>
                </div>
                <button class="btn btn-finish">Finish <font-awesome-icon icon="fa-solid fa-circle-check"/></button>
            </li>
        </ul>

        <ul class="job-list">
            <h3><font-awesome-icon icon="fa-solid fa-clock-rotate-left"/> Vehicles waiting in line</h3>
            <li class="" v-for="job in filterPending" :key="job.job_id">
                <p class="plate-number">{{job.plate_number}}</p>
                <p>{{job.customer.name}} {{job.customer.surname}}</p>
                <strong>{{job.vehicle_type.name}}</strong>
                <strong>{{job.service.name}}</strong>
                <h3>Price: ${{job.service.price}}</h3>
                <div>
                    <a class="btn-sm" @click="deleteJob(job.job_id)"><font-awesome-icon icon="fa-solid fa-trash" /> Delete</a><br>
                    <a class="btn-sm" @click="updateJob(job.job_id)">Update</a>
                </div>
                <button class="btn btn-start">Start <font-awesome-icon icon="fa-solid fa-play"/></button>
            </li>
        </ul>
        
        <ul class="job-list">
            <h3>Vehicles washed today</h3>
            <li class="" v-for="job in filterPassive" :key="job.job_id">
                <p class="plate-number">{{job.plate_number}}</p>
                <p>{{job.customer.name}} {{job.customer.surname}}</p>
                <strong>{{job.vehicle_type.name}}</strong>
                <strong>{{job.service.name}}</strong>
                <h3>Price: ${{job.service.price}}</h3>
                <div>
                    <a class="btn-sm" @click="deleteJob(job.job_id)"><font-awesome-icon icon="fa-solid fa-trash" /> Delete</a><br>
                    <a class="btn-sm" @click="updateJob(job.job_id)">Update</a>
                </div>
                <button class="btn btn-archive">Archive <font-awesome-icon icon="fa-solid fa-circle-check"/></button>
            </li>
        </ul>
    </div>
</template>
<script>
import AddJob from './addJob.vue';
export default {
    components: {
        AddJob
    },
    data() {
        return{
            jobform: false
        }
    },
    methods: {
        closeFeedback() {
            this.$store.commit("pushMessage", false)
        },
        deleteJob(id) {
            this.$store.dispatch('deleteJob', id)
        }
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
    created() {
        this.$store.dispatch("getJobList")
    }
}
</script>