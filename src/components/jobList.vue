<template>
    <div>
        <!-- Daily stats -->
        <div class="daily-stats">
            <ul>
                <li>
                    <div>
                        <h4>Complated Jobs</h4>
                        <p>{{this.filterPassive.length}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-car" class="color-success" />
                    
                </li>
                <li>
                    <div>
                        <h4>Daily income</h4>
                        <p>${{dailyIncome}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-coins" class="color-success" />
                </li>
                <li>
                    <div>
                        <h4>Daily Cost</h4>
                        <p>${{dailyCost}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-coins" class="color-info" />
                </li>
                <li>
                    <div>
                        <h4>Daily Earning</h4>
                        <p>${{dailyEarning}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-sack-dollar" class="color-success" />
                </li>
            </ul>
        </div>

         <div>
                <button class="" @click="jobform = true" >+ Add New Job</button>
                <p v-if="isSuccess" class="successMessage" @click="closeFeedback()">
                    <font-awesome-icon icon="fa-solid fa-circle-check"/> Job added succesfully
                </p>
                <add-job v-if="jobform"/>
         </div>
        <!-- Active JOBS-->
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
                <button class="btn btn-finish" @click="changeStatus(job.job_id, 3)">Finish <font-awesome-icon icon="fa-solid fa-circle-check"/></button>
            </li>
        </ul>
        <!-- Pending JOBS-->
        <ul class="job-list">
            <h3><font-awesome-icon icon="fa-solid fa-clock-rotate-left" class="color-info"/> Vehicles waiting in line</h3>
            <li class="page-fade-up" v-for="job in filterPending" :key="job.job_id">
                <p class="plate-number">{{job.plate_number}}</p>
                <p>{{job.customer.name}} {{job.customer.surname}}</p>
                <strong>{{job.vehicle_type.name}}</strong>
                <strong>{{job.service.name}}</strong>
                <h3>Price: ${{job.service.price}}</h3>
                <div>
                    <a class="btn-sm" @click="deleteJob(job.job_id)"><font-awesome-icon icon="fa-solid fa-trash" /> Delete</a><br>
                    <a class="btn-sm" @click="updateJob(job.job_id)">Update</a>
                </div>
                <button class="btn btn-start" @click="changeStatus(job.job_id, 2)">Start <font-awesome-icon icon="fa-solid fa-play"/></button>
            </li>
        </ul>
        <!-- Complated JOBS-->
        <ul class="job-list">
            <h3><font-awesome-icon icon="fa-solid fa-circle-check" class="color-success"/> Vehicles washed today ({{this.filterPassive.length}})</h3>
            <li class="page-fade-up job-done" v-for="job in filterPassive" :key="job.job_id">
                <p class="plate-number">{{job.plate_number}}</p>
                <p>{{job.customer.name}} {{job.customer.surname}}</p>
                <strong>{{job.vehicle_type.name}}</strong>
                <strong>{{job.service.name}}</strong>
                <small>
                    <span>Start date:</span>
                    <span>{{job.start_date}}</span></small>
                <small>
                    <span>End date:</span>
                    <span>{{job.end_date}}</span>
                </small>
                <h3>Price: ${{job.service.price}}</h3>
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
            jobform: false,
            dailyIncome: 0,
            dailyCost: 0,
            dailyEarning: 0
        }
    },
    methods: {
        closeFeedback() {
            this.$store.commit("pushMessage", false)
        },
        deleteJob(id) {
            this.$store.dispatch('deleteJob', id)
        },
        changeStatus(id,status) {
            this.$store.dispatch('setStatus', {"id": id,"status": status })
        },
        totalPrices() {
            let income = 0
            for(let i = 0; i < this.filterPassive.length; i++) {
                income += this.filterPassive[i].service.price
            } this.dailyIncome = income
            let cost = 0
            for(let i = 0; i < this.filterPassive.length; i++) {
                cost += this.filterPassive[i].service.cost
            } this.dailyCost = cost
            this.dailyEarning = this.dailyIncome - this.dailyCost
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
        },
        isSuccess(){
            return this.$store.state.feedbackMessage
        }
    },
    created() {
        this.$store.dispatch("getJobList")
    },
    watch: {
        isSuccess(){
            if(this.isSuccess) {
                this.jobform = false
            }
        }
    },
    updated() {
        this.totalPrices()
    }
}
</script>