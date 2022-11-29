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
                        <p>{{this.jobData.data.length}}</p>
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
            <h3><font-awesome-icon icon="fa-solid fa-circle-check" class="color-success"/> Complated Jobs ({{this.jobData.data.length}})
            <i class="page-fade-up" v-if="filter.start_date && filter.end_date">{{startDateFormatted}} / {{endDateFormatted}} <a href="#" @click="clearFilter()" class="clear-filter"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></a></i></h3>
            <li class="page-fade-up job-done" v-for="job in this.jobData.data" :key="job.job_id">
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
            jobData: {
                data: []
            },
            startDate: "",
            endDate: "",
            filter:{
                status: 3,
                start_date:"",
                end_date:"",
            },
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
            this.filter.start_date = "",
            this.filter.end_date = ""
        },
        filterJobs() {
            this.$store.dispatch("getJobsByDate", this.filter)
            this.refreshJobs();
        },
        closeFeedback() {
            this.$store.commit("pushMessage", false)
        },
        totalPrices() {
            let income = 0
            for(let i = 0; i < this.jobData.data.length; i++) {
                income += this.jobData.data[i].service.price
            } this.dailyIncome = income
            let cost = 0
            for(let i = 0; i < this.jobData.data.length; i++) {
                cost += this.jobData.data[i].service.cost
            } this.dailyCost = cost
            this.dailyEarning = this.dailyIncome - this.dailyCost
        },
        refreshJobs(){
            setTimeout(() => {
                this.jobData.data = this.$store.state.jobData.data
                            
            console.log(this.jobData)
            }, 1000);
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
        isSuccess(){
            return this.$store.state.feedbackMessage
        },
        isUpdated() {
            return this.$store.state.jobData.data
        }
    },
    created() {
        this.$store.dispatch("getJobList")
    },
    watch: {
        endDateFormatted() {this.filter.start_date = this.endDateFormatted},
        startDateFormatted() {this.filter.end_date = this.startDateFormatted},
        isUpdated() {this.refreshJobs()}
    },
    updated() {
        this.totalPrices()
        this.refreshJobs()
    }
}
</script>