<template>
    <div>
        <!--RESPONSE MESSAGE-->
        <div class="toaster" v-if="this.$store.state.errorResponse.message">
            <p class="errorMessage">
                <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                {{this.$store.state.errorResponse.message}}
            </p>
            <div class="loadbar"></div>
        </div>

        <div class="add-job-card">
            <div>
                <p>Customer:</p>
                <select type="text" v-model="newJobData.customerID">
                    <option  v-for="customer in this.$store.state.customerData.data" :value="customer.customer_id" :key="customer.customer_id">{{customer.name}} {{customer.surname}}</option>
                </select>
            </div>
            <div>
                <p>Plate Number: </p>
                <input type="text" v-model="newJobData.plateNumber">
            </div>
            <div>
                <p>Vehicle Type:</p>
                <select type="text" v-model="newJobData.vehicleTypeID">
                    <option v-for="type in this.$store.state.vehicleTypes.data" :value="type.vehicle_type_id" :key="type.vehicle_type_id">{{type.name}}</option>
                </select>
            </div>
            <div>
                <p>Service:</p>
                <select type="text" v-model="newJobData.serviceID">
                    <option v-for="service in this.$store.state.serviceData.data" :value="service.service_id" :key="service.service_id">{{service.name}}</option>
                </select>
            </div>
            <div>
                <button class="btn-md btn-save" @click="postNewJob()">Save</button>
                <button class="btn-md btn-cancel" @click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newJobData: {
                customerID: "",
                vehicleTypeID:"",
                serviceID:"",
                plateNumber:""
            }
        }
    },
    methods: {
        postNewJob(){
            this.$store.dispatch("addNewJob", this.newJobData)
        },
        cancel(){
            this.$emit("isJobAdded", false)
        }
    },
    created() { return this.$store.state.feedbackMessage = false
    },
    mounted() {
        this.$store.dispatch("getVehicles")
        this.$store.dispatch("getServices")
        this.$store.dispatch("getCustomers")
    }
}
</script>