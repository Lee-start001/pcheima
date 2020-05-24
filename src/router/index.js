//  导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入插件
import Vue from 'vue'

// 导入路由 router
import VueRouter from 'vue-router'

// 导入组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'




//  注册路由
Vue.use(VueRouter)

//  实例化
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login
        },
        {
            path: "/index",
            component: index
        },

    ]
})


//  暴露出去  输需要 谁导入即可
export default router
