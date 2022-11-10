import Vue from 'vue';
import VueRouter from 'vue-router'
import { store } from '@/store/store';

// Views
import Dashboard from "../pages/dashboard/homeView";
import Settings from "../pages/dashboard/settingsView";
import Auth from "../pages/authView";
// navitagions 
import sideBar from "../components/sideBar.vue"
import topBar from "../components/topBar.vue"

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        {
            path: "/",
            component : Auth,
            beforeEnter(to, from, next) {
                if(store.getters.isAuth){
                    next("/dashboard")
                } else {
                    next("/auth")
                }
            }
        },
        {
            path: "/dashboard",
            components: {default:Dashboard,top:topBar,side:sideBar},
            beforeEnter(to, from, next) {
                if(store.getters.isAuth){
                    next()
                } else {
                    next("/")
                }
            }
        },
        {
            path: "/settings",
            components: {default:Settings,top:topBar,side:sideBar},
            beforeEnter(to, from, next) {
                if(store.getters.isAuth){
                    next()
                } else {
                    next("/")
                }
            }
        },
        { 
            path: "/auth",
            component : Auth,
            beforeEnter(to,from,next) {
                if(store.getters.isAuth){
                    next("/dashboard")
                } else {
                    next()
                }
            }
        }
    ],
    mode: "history"
})