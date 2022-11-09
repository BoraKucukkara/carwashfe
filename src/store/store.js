import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import { router } from "@/routes/routes"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        userAuth: {
            access_token: ""
        },

        // APIurls:
        POSTlogin: "http://localhost/api/auth/login",
        POSTlogout:"http://localhost/api/auth/logout",
        POSTregister:"http://localhost/api/auth/register",
        GETprofile:"http://localhost/api/auth/user-profile"
    },
    getters : {
        isAuth(state) {
            return state.userAuth.access_token !== ""
        },
    },
	mutations : {
        setAuth(state, data) {
            state.userAuth = data
        }
    },
    actions : {
        login({commit, state}, submited) {
            axios.post(
                state.POSTlogin,
                {email: submited.email, password: submited.password}
            ).then(response => {
                commit("setAuth", response.data)
                router.push("/")
            })
        }
    }
});