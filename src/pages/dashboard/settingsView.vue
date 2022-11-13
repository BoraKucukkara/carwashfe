<template>
    <main class="page-fade-up">
        <h1>Account Settings</h1>
        <section>
            <span>Name / Surname</span>
            <p>{{this.$store.state.userData.name}} {{this.$store.state.userData.surname}} <a class="btn-sm">edit</a></p>
            <span>E-mail</span>
            <p>{{this.$store.state.userData.email}} <a class="btn-sm">change</a></p>
            <span>Password</span>
            <p>********* <a class="btn-sm">reset</a></p>
        </section>
        <section>
            <h2>Services</h2><a class="btn-sm">+ add service</a>
            <div class="add-service-card">
                <label for="service">Service name</label>
                <input v-model="newService.name" name="service" type="text">
                
                <label for="cost">Cost</label>
                <input v-model="newService.cost" name="cost" type="number">

                <label for="price">Price</label>
                <input v-model="newService.price" name="price" type="number">
                <button class="btn-sm" @click="addNewService">Add Service</button>
            </div>

            <p class="loader" v-if="this.$store.state.serviceData.data.length == 0" ><font-awesome-icon icon="fa-solid fa-spinner" spin/> Loading services</p>
            
            <ul>
                <li class="page-fade-up" v-for="service in this.$store.state.serviceData.data" :key="service.service_id">
                    <h3>{{ service.name }}</h3> <div>Cost: $ <input type="number" :value="service.cost"> Price: $ <input type="number" :value="service.price"> </div>
                </li>
            </ul>
            <button v-if="this.$store.state.serviceData.data.length !== 0">apply changes</button>
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
            }
        }
    },
    methods:{
        loadServices(){
            this.$store.dispatch("getServices")
        },
        addNewService(){
            this.$store.dispatch("addService", {name: this.newService.name, cost: this.newService.cost, price: this.newService.price})
        }
    },
    mounted(){
        this.loadServices()
    },
}
</script>