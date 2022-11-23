<template>
    <main class="page-fade-up">
        <h1>Settings</h1>
        <section>
            <h2>Profile Settings</h2>

            <span>Company Name</span>
            <p v-if="!editMode.company">{{this.$store.state.userData.company}} <a class="btn-sm page-fade-up" @click="editCompany(true)">edit</a></p>
            <p v-if="editMode.company">
                <input type="text" v-model="userData.company">
                <a class="btn-sm page-fade-up" @click="editCompany('save')">save</a> <a class="btn-sm page-fade-up" @click="editCompany(false)">cancel</a> 
            </p>

            <span>Name / Surname</span>
            <p v-if="!editMode.name">{{this.$store.state.userData.name}} {{this.$store.state.userData.surname}} <a @click="editName(true)" class="btn-sm">edit</a></p>
            <p v-if="editMode.name">
                <input type="text" v-model="userData.name"> <input type="text" v-model="userData.surname">
                <a class="btn-sm page-fade-up" @click="editName('save')">save</a> <a class="btn-sm page-fade-up" @click="editName(false)">cancel</a> 
            </p>

            <span>E-mail</span>
            <p v-if="!editMode.email">{{this.$store.state.userData.email}} <a class="btn-sm" @click="editEmail(true)">change</a></p>
            <p v-if="editMode.email">
                <input type="text" v-model="userData.email">
                <a class="btn-sm page-fade-up" @click="editEmail('save')">save</a> <a class="btn-sm page-fade-up" @click="editEmail(false)">cancel</a> 
            </p>
           
            <span>Password</span>
            <p v-if="!editMode.password">********* <a class="btn-sm" @click="editPassword(true)">reset</a></p>
            <p v-if="editMode.password">
                <input type="text" v-model="userData.password"> <input type="text" v-model="editMode.passwordConfirm">
                <a class="btn-sm page-fade-up" @click="editPassword('save')">save</a> <a class="btn-sm page-fade-up" @click="editPassword(false)">cancel</a> 
            </p>
            <span v-if="!editMode.passMatch && editMode.password">Passwords do not match</span>

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
            <!-- update services response -->
            <p v-if="isSuccess" class="successMessage" @click="closeFeedback()">
                    <font-awesome-icon icon="fa-solid fa-circle-check"/> Services Updated
            </p>
            <!-- api error response -->
            <p class="errorMessage" v-if="this.$store.state.errorResponse.message" >
                <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
                {{this.$store.state.errorResponse.message}}
            </p>
            <!-- loading message -->
            <p class="loader" v-if="this.serviceContainer.length == 0" >
                <font-awesome-icon icon="fa-solid fa-spinner" spin/> Loading services
            </p>
            <!-- Services List -->
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
            serviceContainer : [],
            editMode: {
                company: false,
                name: false,
                email: false,
                password: false,
                passwordConfirm: "",
                passMatch: null
            },
            userData: []
        }
    },
    methods:{
        loadUserData() {
            this.$store.dispatch("refreshProfile")
            this.userData = this.$store.state.userData
        },
        editCompany(data) {
            if(data == 'save') {
                this.$store.dispatch("updateCompany", this.userData.company)
                this.editMode.company = false
            } else if(data == false) {
                this.editMode.company = data
                this.loadUserData()
            } else {
                this.editMode.company = data
            }
        },
        editName(data) {
            if(data == "save") {
                let payload = {name: this.userData.name, surname: this.userData.surname}
            this.$store.dispatch("updateName", payload)
                this.editMode.name = false
            } else if(data == false) {
                this.editMode.name = data
                this.loadUserData()
            } else {
                this.editMode.name = data
            }
        },
        editEmail(data) {
            if(data == 'save') {
                this.$store.dispatch("updateEmail", this.userData.email)
                this.editMode.email = false
            } else if(data == false) {
                this.editMode.email = data
                this.loadUserData()
            } else {
                this.editMode.email = data
            }
        },
        editPassword(data) {
            if(data == 'save' && this.passMatch) {
                this.$store.dispatch("updatePassword", this.userData.password)
                this.editMode.password = false
            } else if(data == false) {
                this.editMode.password = data
                this.loadUserData()
            } else {
                this.editMode.password = data
            }
        },
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
        },
        closeFeedback() {
            this.$store.commit("pushMessage", false)
        },
    },
    computed: {
        isLoaded() {
            return this.$store.state.serviceData.data
        },
        isSuccess(){
            return this.$store.state.feedbackMessage
        },
        isEdited() {
            return this.$store.state.userData
        }
    },
    watch: {
        isLoaded() {
            this.serviceContainer = this.$store.state.serviceData.data
        },
        isEdited() {
            this.userData = this.$store.state.userData
        }
    },
    mounted(){
        this.loadServices()
        this.loadUserData()
    }
}
</script>