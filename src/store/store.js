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
        userData: {
        },
        // Services 
        serviceData: {
            data: []
        },
        // UX Feedbacks
        logoutConfirm: "",
        loginConfirm: "",
        // UI Elements

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
            state.userAuth.access_token = data
        },
        getProfile(state, data) {
            state.userData = data
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
                commit("setAuth", response.data.access_token)
                localStorage.setItem("token",response.data.access_token)
                commit("getProfile", response.data.user)
                localStorage.setItem("userData",JSON.stringify(response.data.user))
                router.push("/dashboard")
                console.log(response.data)
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
            })
        },
        getServices({commit}) {
            axios.get(
                this.state.BaseURL + this.state.GETservices,
                {"headers": {"Authorization": "Bearer " + localStorage.getItem("token")}}
            ).then(response => {
                commit("setServices", response.data),
                console.log(response.data)
            })
        }
    }
});