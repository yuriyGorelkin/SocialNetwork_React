import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '5987ff9c-f742-46ec-958a-ffaa79f8149f'
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    followUser(userID) {
        return instance.post(`follow/${userID}`)
            .then(response => {
                return response.data;
            })
    },

    unfollowUser(userID) {
        return instance.delete(`follow/${userID}`)
            .then(response => {
                return response.data;
            })
    },

    getProfile(userID) {
        return instance.get(`profile/${userID}`)
            .then(response => {
                return response.data;
            })
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}


