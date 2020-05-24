//  导入axios
import axios from 'axios'


// 封装方法 暴露出去
//  封装一个获取手机验证码的函数
export function getSMS(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        // 允许携带cookie
        withCredentials: true,
        data
    })
}