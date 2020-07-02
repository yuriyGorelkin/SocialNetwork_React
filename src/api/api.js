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
    }
}

export const profileAPI = {
    getProfile(userID) {
        return instance.get(`profile/${userID}`)
            .then(response => {
                return response.data;
            })
    },
    getStatus(userID) {
        return instance.get(`profile/status/${userID}`)
            .then(response => {
                return response.data;
            })
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        });
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }    
}



