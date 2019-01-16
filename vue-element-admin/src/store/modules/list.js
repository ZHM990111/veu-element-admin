import { getUserList,updateUserInfo,deleteUser} from '@/api/user'

const state = {
    list: []
}

const mutations = {
    updateList(state, list) {
        state.list = list
    }
}

const actions = {
    getUserList({ commit }, query) {
        return new Promise((resolve, reject) => {
            getUserList(query).then(res => {
                console.log(res)
                if (res.data.code == 1) {
                    commit('updateList', res.data.data.list)
                    resolve()
                } else {
                    reject(res.data.msg)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateUserInfo({commit},data){
        return new Promise((resolve,reject)=>{
            updateUserInfo(data).then(res=>{
                if (res.data.code == 1) {
                    resolve(res.data.msg)
                } else {
                    reject(res.data.msg)
                } 
            }).catch(err => {
                reject(err)
            })
        })
    },
    //删除
    deleteUser({commit},data){
        return new Promise((resolve,reject)=>{
            deleteUser(data).then(res=>{
                if (res.data.code == 1) {
                    resolve(res.data.msg)
                } else {
                    reject(res.data.msg)
                } 
            }).catch(err => {
                reject(err)
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}