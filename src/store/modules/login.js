import { SAVE_ACCESS_TOKEN, SAVE_USER_NAME, EXIT } from '../mutation-types.js'
import axios from 'axios';
import qs from 'qs';
// initial state
const state = {
    accessToken: localStorage.getItem('accessToken'),
    userName: localStorage.getItem('userName')
};

// actions
const actions = {
    login({ commit, state }, { userName, password }) {
        return new Promise((resolve, reject) => {
            axios.post(LOGIN_URL, qs.stringify({ userName, password }))
                .then((response) => {
                    // 登陆成功
                    if (1 == response.data.status) {
                        commit('saveUserName', userName);
                        commit('saveAccessToken', response.data.data.accessToken);
                    }
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

// mutations
const mutations = {
    /**
     * 存储accessToken
     */
    [SAVE_ACCESS_TOKEN](state, accessToken) {
        state.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
    },
    /**
     * 存储userName
     */
    [SAVE_USER_NAME](state, userName) {
        state.userName = userName;
        localStorage.setItem('userName', userName);
    },
    /**
     * 退出登陆
     */
    [EXIT](state) {
        state.accessToken = '';
        localStorage.removeItem('accessToken');
    }
};

export default {
    state,
    actions,
    mutations
};
