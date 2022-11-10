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
        // UX Feedbacks
        logoutConfirm: "",
        loginConfirm: "",
        // UI Elements
        BTNlogin: "Login",
        // APIurls:
        BaseURL: "http://localhost/api/auth/",
        POSTlogin: "login",
        POSTlogout:"logout",
        POSTregister:"register",
        GETprofile:"user-profile"
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
                router.push("/auth")
                console.log(response.data)
            })
        }
    }
});