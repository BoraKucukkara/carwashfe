<template>
    <main>
        <!-- FILTER BY DATE -->
        <div class="job-filter">
            <font-awesome-icon icon="fa-solid fa-calendar-days" class="calendar-icon" /><span class="header">Filter Jobs by date</span>
            <vc-date-picker v-model="startDate" :masks="masks" is-required>
                <template v-slot="{ inputValue, inputEvents }">
                    Start Date <input
                    type="text"
                    :value="inputValue"
                    v-on="inputEvents"
                    />
                </template>
            </vc-date-picker>
            <vc-date-picker v-model="endDate" :masks="masks" is-required>
                <template v-slot="{ inputValue, inputEvents }">
                    End Date <input
                    type="text"
                    :value="inputValue"
                    v-on="inputEvents"
                    />
                </template>
            </vc-date-picker>
            <button @click="filterJobs()">Filter</button>
        </div>
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
                        <h4>Total income</h4>
                        <p>${{dailyIncome}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-coins" class="color-success" />
                </li>
                <li>
                    <div>
                        <h4>Total Cost</h4>
                        <p>${{dailyCost}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-coins" class="color-info" />
                </li>
                <li>
                    <div>
                        <h4>Total Earning</h4>
                        <p>${{dailyEarning}}</p>
                    </div>
                    <font-awesome-icon icon="fa-solid fa-sack-dollar" class="color-success" />
                </li>
            </ul>
        </div>
        
        <!-- Complated JOBS-->
        <ul class="job-list">
            <h3><font-awesome-icon icon="fa-solid fa-circle-check" class="color-success"/> Complated Jobs ({{this.filterPassive.length}})
            <i class="page-fade-up" v-if="startDateData && endDateData">{{startDateFormatted}} / {{endDateFormatted}} <a href="#" @click="clearFilter()" class="clear-filter"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></a></i></h3>
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
    </main>
</template>
<script>
export default {
    components: {
    },
    data() {
        return{
            startDate: "",
            endDate: "",
            startDateData:"",
            endDateData:"",
            jobform: false,
            dailyIncome: 0,
            dailyCost: 0,
            dailyEarning: 0,
            masks: {
                input: 'DD-MM-YYYY',
                mode: "date",
                data: 'DD-MM-YYY'
            },

        }
    },
    methods: {
        clearFilter() {
            this.startDateData = "",
            this.endDateData = ""
        },
        filterJobs() {
            
        },
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
        startDateFormatted() {
            let dateFormat = this.startDate
            let day = dateFormat.toLocaleString().split('.')[0]
            let month = dateFormat.toLocaleString().split('.')[1]
            let year = dateFormat.toLocaleString().split('.')[2]
            let newDate = day + '-' + month + '-' + year
            return newDate.split(' ')[0]
        },
        endDateFormatted() {
            let dateFormat = this.endDate
            let day = dateFormat.toLocaleString().split('.')[0]
            let month = dateFormat.toLocaleString().split('.')[1]
            let year = dateFormat.toLocaleString().split('.')[2]
            let newDate = day + '-' + month + '-' + year
            return newDate.split(' ')[0]
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
        },
        endDateFormatted() {this.endDateData = this.endDateFormatted},
        startDateFormatted() {this.startDateData = this.startDateFormatted}
    },
    updated() {
        this.totalPrices()
    }
}
</script>