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

//删除数据
export function deleteUser(data) {
    return request({
        url: '/users/action',
        method: 'delete',
        data
    })
}

//修改角色
export function updateRolers(data) {
    return request({
        url: '/users/action',
        method: 'put',
        data
    })
}

//提交
export function Commits(data) {
    return request({
        url: '/users/commit',
        method: 'get',
        data
    })
}

