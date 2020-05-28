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

// 导入提示框
import { Message } from 'element-ui';

//导入vux
import store from '../store/index.js'

//导入登录
import { getInfo } from "../api/index";
import { removeToken } from "../utilis/token";
//  注册路由
Vue.use(VueRouter)

//  实例化
const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: login,
            meta: { title: '登录' }
        },
        {
            path: "/login",
            redirect: "/"
        },
        {
            path: "/index",
            component: index,
            meta: { title: '首页' },
            children: [
                {
                    path: 'user',
                    component: user,
                    meta: { title: '用户' }
                },
                {
                    path: 'chart',
                    component: chart,
                    meta: { title: '数据' }
                },
                {
                    path: 'question',
                    component: question,
                    meta: { title: '题库' }
                },
                {
                    path: 'business',
                    component: business,
                    meta: { title: '企业' }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: { title: '学科' }
                },
            ]
        },

    ]
})

let whiteUrl = ['/', 'zhuce', 'guanggao']
//  导航守卫
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    NProgress.start();
    //判断是否去往登录页面
    //if (to.path == '/')
    if (whiteUrl.includes(to.path)) {
        //放行
        next()
    } else {
        getInfo().then(res => {
            if (res.data.code == 200) {
                store.commit('changeUsername', res.data.data.username)
                store.commit('changeAvatar', process.env.VUE_APP_URL + '/' + res.data.data.avatar)
                //放行
                next()
            } else {
                //提示登录错误
                Message.error('登录异常')
                //放行至登录页
                next('/')
                //删除本地token
                removeToken()
                //手结束进度条
                NProgress.done();
            }
        })
    }

})

router.afterEach((to) => {
    // to and from are both route objects.
    document.title = to.meta.title
    NProgress.done();
})
//  暴露出去  输需要 谁导入即可
export default router
