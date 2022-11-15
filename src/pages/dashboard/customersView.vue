<template>
    <main class="page-fade-up">
            <h1>Customers</h1>

            <div>
        <ul class="job-list">
            <div class="add-data-card">
                <p><font-awesome-icon icon="fa-solid fa-user-plus" /> Add new customer</p>
                <div>
                    <label for="1">Name</label>
                    <input v-model="newCustomer.name" name="1" type="text">
                    
                    <label for="2">Surname</label>
                    <input v-model="newCustomer.surname" name="2" type="text">

                    <label for="3">Phone</label>
                    <input v-model="newCustomer.phone" name="3" type="text">
                    <button class="btn-action" @click="addNewCustomer">+ Add New Customer</button>
                </div>
            </div>
            <p class="errorMessage" v-if="this.$store.state.errorResponse.message" ><font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                {{this.$store.state.errorResponse.message}}
            </p>
            <h2>Customer list</h2> 
            <p class="loader" v-if="this.$store.state.customerData.data.length == 0" ><font-awesome-icon icon="fa-solid fa-spinner" spin/> Loading customers</p>
            <li v-for="customer in this.$store.state.customerData.data.slice().reverse()" class="page-fade-up" :key="customer.customer_id">
                <div class=""><p><font-awesome-icon icon="fa-solid fa-user"/> {{customer.name}} {{customer.surname}}</p></div>
                <div><p>{{customer.phone}}</p></div>
            </li>
        </ul>
    </div>
    </main>
    
</template>
<script>
export default {
    data() {
        return {
            newCustomer: {
                name: "",
                surname: "",
                phone: ""
            }
        }
    },
    methods: {
        loadCustomers() {
            this.$store.dispatch("getCustomers")
        },
        addNewCustomer(){
            this.$store.dispatch("addCustomer", {name: this.newCustomer.name, surname: this.newCustomer.surname, phone: this.newCustomer.phone})
        }
    },
    mounted() {
        this.loadCustomers()
    }
}
</script>