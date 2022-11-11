import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import { router } from "@/routes/routes"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        // Authorization
        userAuth: {
            access_token: ""
        },
        serviceData: {
            data: []
        },
        // UX Feedbacks
        logoutConfirm: "",
        loginConfirm: "",
        // UI Elements
        BTNlogin: "Login",
        // APIurls:
        BaseURL: "http://localhost/api/",
        POSTlogin: "auth/login",
        POSTlogout:"auth/logout",
        POSTregister:"auth/register",
        GETprofile:"auth/user-profile",
        GETservices:"services"
    },
    getters : {
        isAuth(state) {
            return state.userAuth.access_token !== ""
        }
    },
	mutations : {
        setAuth(state, data) {
            state.userAuth = data
        },
        clearAuth(state, data) {
            state.userAuth.access_token = ""
            state.logoutConfirm = data
        },
        setServices(state,data){
            state.serviceData = data
        }
    },
    actions : {
        login({commit, state}, submited) {
            axios.post(
                state.BaseURL + state.POSTlogin,
                {email: submited.email, password: submited.password}
            ).then(response => {
                commit("setAuth", response.data)
                router.push("/dashboard")
                console.log(response.data)
            })
        },
        logout({commit}) {
            axios.post(
                this.state.BaseURL + this.state.POSTlogout, "",
                {"headers": {"Authorization": "Bearer " + this.state.userAuth.access_token}}
            ).then(response => {
                commit("clearAuth", response.data),
                router.push("/login")
                console.log(response.data)
            })
        },
        getServices({commit}) {
            axios.get(
                this.state.BaseURL + this.state.GETservices, 
                {"headers": {"Authorization": "Bearer " + this.state.userAuth.access_token}}
            ).then(response => {
                commit("setServices", response.data),
                console.log(response.data)
            })
        }
    }
});