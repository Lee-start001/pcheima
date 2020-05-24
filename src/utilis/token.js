//定义个常量存放token
const MYTONKEY = 'myToken'

//  获取token的值
export function getToken() {
    return window.localStorage.getItem('MYTONKEY')
}

//设置token
export function setToken(token) {
    window.localStorage.setItem('MYTONKEY', token)
}

//删除token
export function remveToken() {
    window.localStorage.removeItem('MYTONKEY')
}