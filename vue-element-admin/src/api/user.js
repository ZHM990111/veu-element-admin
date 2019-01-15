import request from '@/utils/request'

//用户列表
export function getUserList(params) {
    console.log(params)
    return request({
        url: '/users/list', // 假地址 自行替换
        method: 'get',
        params
    })
}

//更新数据
export function updateUserInfo(data) {
    return request({
        url: '/users/update',
        method: 'post',
        data
    })
}