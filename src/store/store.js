import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import { router } from "@/routes/routes"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        // Authorization
        userAuth: {
            access_token: "" // Default token placeholder
        },
        userData: { // Default user data placeholder
        },
        // Services 
        serviceData: {
            data: [] 
        },
        customerData: {
            data: []
        },
        // UX Feedbacks
        logoutConfirm: "",
        loginConfirm: "",
        errorResponse: {},
        // UI Elements

        // APIurls:
        BaseURL: "http://localhost/api/",
        // Auth
            POSTlogin: "auth/login",
            POSTlogout:"auth/logout",
            POSTregister:"auth/register",
            POSTrefresh:"auth/refresh",
            GETprofile:"auth/user-profile",
        // Services
            GETservices:"services",
            POSTserviceAdd:"services/add",
            POSTserviceDelete:"services/delete",
        // Costumers 
            GETcustomers:"customers",
            POSTcustomerAdd:"customers/add"

    },
    getters : {
        isAuth(state) {
            return state.userAuth.access_token !== "" // checks if has token, than routes page
        }
    },
	mutations : {
        setAuth(state, data) { // gets token data from login action and than sets state data
            state.userAuth.access_token = data
        },
        getLocalData(state) { // if localstorage has auth data, sets token and user data to state
            let hasToken = localStorage.key("token")
            let userData = localStorage.getItem("userData")
            if(hasToken) {
                let payload = JSON.parse(userData)
                state.userAuth.access_token = localStorage.getItem("token")
                state.userData = payload
                router.push("/dashboard")
            }
        },
        getProfile(state, data) {
            state.userData = data
        },
        clearAuth(state, data) { // clears token data after logout action
            state.userAuth.access_token = ""
            if(data && data.success) {
                state.logoutConfirm = state.userData.name + ", successfully logged out" // UX feedback 
            }
        },
        setServices(state,data){
            state.serviceData = data
        },
        setCustomers(state,data){
            state.customerData = data
        },
        pushError(state,data) {
            state.errorResponse = data
        }
    },
    actions : {
        // AUTH CONTROLS
        login({commit, state}, submited) {
            axios.post(
                state.BaseURL + state.POSTlogin,
                {email: submited.email, password: submited.password}
            ).then(response => {
                commit("setAuth", response.data.access_token)
                localStorage.setItem("token",response.data.access_token)
                commit("getProfile", response.data.user)
                localStorage.setItem("userData",JSON.stringify(response.data.user))
                router.push("/dashboard")
            })
        },
        logout({commit, state}) {
            axios.post(
                state.BaseURL + state.POSTlogout, "",
                {"headers": {"Authorization": "Bearer " + state.userAuth.access_token}}
            ).then(response => {
                commit("clearAuth", response.data),
                localStorage.clear()
                router.push("/login")
                console.log(response.data)
                return response
            }).catch(error => {
                commit("clearAuth", error.data),
                localStorage.clear()
                router.push("/login")
            })
        },
        refreshToken({commit, state}) {
            axios.post(
                state.BaseURL + state.POSTrefresh, "",
                {"headers": {"Authorization": "Bearer " + localStorage.getItem("token")}}
            ).then(response => {
                commit("setAuth", response.data.access_token)
                localStorage.removeItem("token")
                localStorage.setItem("token",response.data.access_token)
                console.log("token refresh...")
            }).catch(error => {
                this.dispatch("logout")
                router.push("/login")
                return error
            })
        },

        // SERVICE CONTROLS
        getServices({commit}) {
            axios.get(
                this.state.BaseURL + this.state.GETservices,
                {"headers": {"Authorization": "Bearer " + localStorage.getItem("token")}}
            ).then(response => {
                commit("setServices", response.data)
                return response
            })
        },
        addService({state},payload) {
            axios.post(
                state.BaseURL + state.POSTserviceAdd,
                {name: payload.name, cost: payload.cost, price: payload.price},
                {"headers": {"Authorization": "Bearer " + state.userAuth.access_token}}
            ).then(response => {
                this.dispatch("getServices")
                this.commit("pushError", null)
                return response
            }).catch(error => {
                this.commit("pushError", JSON.parse(error.request.response))
            })
        },

        // COSTUMER CONTROLS
        getCustomers({commit}) {
            axios.get(
                this.state.BaseURL + this.state.GETcustomers,
                {"headers": {"Authorization": "Bearer " + localStorage.getItem("token")}}
            ).then(response => {
                commit("setCustomers", response.data)
                return response
            })
        },
        addCustomer({state},payload) {
            axios.post(
                state.BaseURL + state.POSTcustomerAdd,
                {name: payload.name, surname: payload.surname, phone: payload.phone},
                {"headers": {"Authorization": "Bearer " + state.userAuth.access_token}}
            ).then(response => {
                this.dispatch("getCustomers")
                return response
            }).catch(error => {
                this.commit("pushError", JSON.parse(error.request.response))
            })
        }

    }
});