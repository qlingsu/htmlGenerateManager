import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/Index";
import Home from '../views/Home.vue'

import Login from "@/views/Login.vue";

import Theme from "@/views/Theme.vue";
import Component from "@/views/Component.vue";
import Source from "@/views/Source.vue";
import User from '@/views/User.vue';
import Charts from '@/views/Charts.vue';
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "index",
        component: Index,
        children: [

            // {
            //     path: 'home',
            //     name: '主页',
            //     component: Home,
            // },
            {
                path: 'theme/:themeId?/:themeName?',
                name: '图标组主题',
                component: Theme
            },
            {
                path: 'component/:componentId?/:componentName?',
                name: '组件',
                component: Component
            },
            {
                path: 'source/:sourceId?/:sourceName?',
                name: '数据源',
                component: Source
            },
            {
                path: 'charts/:chartsId?/:chartsName?',
                name: '图表',
                component: Charts
            },
            {
                path: 'user',
                name: '用户管理',
                component: User
            },
            // {
            //     path: 'user',
            //     name: '数据源',
            //     component: User
            // },
            // {
            //     path: 'user',
            //     name: '组件',
            //     component: User
            // },
            // {
            //     path: 'user',
            //     name: '图标组主题',
            //     component: User
            // },
        ]
    },
    {
        path: "/login",
        name: "登录页",
        component: Login
    },

];

const router = new VueRouter({
    routes
})
export { routes };
export default router