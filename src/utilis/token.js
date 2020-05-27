//定义个常量存放token
//const MYTONKEY = 'myToken'

//  获取token的值
export function getToken() {
    return window.localStorage.getItem('myToken')
}

//设置token
export function setToken(token) {
    window.localStorage.setItem('myToken', token)
}

//删除token
export function removeToken() {
    window.localStorage.removeItem('myToken')
}