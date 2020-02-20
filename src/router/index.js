//  导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入插件
import Vue from 'vue'

import VueRouter from 'vue-router'
import login from '../views/login/login.vue'

//  注册
Vue.use(VueRouter)

//  实例化
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        }

    ]
})


//  暴露出去
export default router
