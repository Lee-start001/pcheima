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

import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import business from '../views/index/business/business.vue'
import subject from '../views/index/subject/subject.vue'
import question from '../views/index/question/question.vue'

//导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
            component: index,
            children: [
                {
                    path: 'user',
                    component: user
                },
                {
                    path: 'chart',
                    component: chart
                },
                {
                    path: 'question',
                    component: question
                },
                {
                    path: 'business',
                    component: business
                },
                {
                    path: 'subject',
                    component: subject
                },
            ]
        },

    ]
})

//  导航守卫
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    NProgress.start();
    //放行
    next()
})

router.afterEach(() => {
    // to and from are both route objects.
    NProgress.done();
})
//  暴露出去  输需要 谁导入即可
export default router
