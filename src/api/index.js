import axios from 'axios'

import { getToken } from '../utilis/token'


let indexRequest = axios.create({
    //基地址
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()
    // }
})

//  axios 拦截器
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 
    //为每一个请求添加token
    config.headers.token = getToken()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 封装获取用户信息的方法
export function getInfo() {
    return indexRequest({
        url: '/info',
        method: "get",
    })
}

//  退出
export function outInfo() {
    return indexRequest({
        url: '/logout',
        method: "get",

    })
}