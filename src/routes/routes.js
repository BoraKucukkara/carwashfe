import Vue from 'vue';
import VueRouter from 'vue-router'
import { store } from '@/store/store';

// Views
import Dashboard from "../pages/dashboard/homeView";
import Auth from "../pages/authView";

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
            component : Dashboard,
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