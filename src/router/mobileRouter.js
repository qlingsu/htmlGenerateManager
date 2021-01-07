import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/Index";

import MobileView from "@/views/MobileView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: "/index/:groupId?",
        name: "index",
        component: MobileView,
    }
];

const router = new VueRouter({
    routes
})
export { routes };
export default router