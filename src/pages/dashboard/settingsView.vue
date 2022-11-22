<template>
    <main class="page-fade-up">
        <h1>Account Settings</h1>
        <section>
            <span>Compnay Name</span>
            <p>{{this.$store.state.userData.company}} <a class="btn-sm">edit</a></p>
            <span>Name / Surname</span>
            <p>{{this.$store.state.userData.name}} {{this.$store.state.userData.surname}} <a class="btn-sm">edit</a></p>
            <span>E-mail</span>
            <p>{{this.$store.state.userData.email}} <a class="btn-sm">change</a></p>
            <span>Password</span>
            <p>********* <a class="btn-sm">reset</a></p>
        </section>
        <section>
            <h2>Services</h2>
            <div class="add-data-card">
                <p>Add new service</p>
                <div>
                    <label for="service">Service name</label>
                    <input v-model="newService.name" name="service" type="text">
                    
                    <label for="cost">Cost</label>
                    <input v-model="newService.cost" name="cost" type="number">

                    <label for="price">Price</label>
                    <input v-model="newService.price" name="price" type="number">
                    <button class="btn-action" @click="addNewService">+ Add Service</button>
                </div>

            </div>
            <p v-if="isSuccess" class="successMessage" @click="closeFeedback()">
                    <font-awesome-icon icon="fa-solid fa-circle-check"/> Services Updated
            </p>
            <!-- api error response -->
            <p class="errorMessage" v-if="this.$store.state.errorResponse.message" >
                <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                {{this.$store.state.errorResponse.message}}
            </p>
            <p class="loader" v-if="this.serviceContainer.length == 0" >
                <font-awesome-icon icon="fa-solid fa-spinner" spin/> Loading services
            </p>
            
            <ul class="service-list">
                <li class="page-fade-up" v-for="service in this.serviceContainer" :key="service.service_id">
                    <h3>{{ service.name }}</h3>
                    <div>Cost: $ <input type="number" v-model="service.cost"> Price: $ <input type="number" v-model="service.price">
                    <a class="btn-sm" @click="deleteService(service.service_id)"><font-awesome-icon icon="fa-solid fa-trash" /></a></div>
                </li>
            </ul>
            <button v-if="this.$store.state.serviceData.data.length !== 0" @click="postBulkData()">apply changes</button>
        </section>
    </main>
</template>
<script>
export default {
    data() {
        return{
            newService: {
                name: "",
                cost: "",
                price: ""
            },
            serviceContainer : []
        }
    },
    methods:{
        loadServices(){
            this.$store.dispatch("getServices")
        },
        addNewService(){
            this.$store.dispatch("addService", {name: this.newService.name, cost: this.newService.cost, price: this.newService.price})
        },
        deleteService(id) {
            this.$store.dispatch('dellService', id)
        },
        postBulkData() {
            this.$store.dispatch("bulkUpdate", this.serviceContainer)
        }
    },
    computed: {
        isLoaded() {
            return this.$store.state.serviceData.data
        },
        isSuccess(){
            return this.$store.state.feedbackMessage
        }
    },
    watch: {
        isLoaded() {
            this.serviceContainer = this.$store.state.serviceData.data
        }
    },
    mounted(){
        this.loadServices()
    }
}
</script>