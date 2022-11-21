import Vue from 'vue';
import VueRouter from 'vue-router'
import { store } from '@/store/store';

// Views
import Dashboard from "../pages/dashboard/homeView";
import Settings from "../pages/dashboard/settingsView";
import Customers from "../pages/dashboard/customersView";
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
                    next("/login")
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
            path: "/customers",
            components: {default:Customers,top:topBar,side:sideBar},
            beforeEnter(to, from, next) {
                if(store.getters.isAuth){
                    next()
                } else {
                    next("/")
                }
            }
        },
        { 
            path: "/login",
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