import axios from 'axios'
import { getFromStorage, saveToStorage } from './../utils/localStorage';
import { useDispatch } from 'react-redux';
import { updateToken } from '../redux/slices/user';
import { store } from '../redux/store';

const $api = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:7000/api"
})
const $apiAuth = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:7000/api"
})
// $apiAuth.defaults.withCredentials = true

$api.interceptors.request.use(config=>{
    config.headers.Authorization = `Bearer ${getFromStorage('accessToken')}`
    return config
})

$api.interceptors.response.use(config=>{
    return config
},async error=>{
    if(error.response.status === 401 && error.response !== undefined){
        try {
            const res = await $apiAuth.get('/auth/refresh')
            const tokens = res.data
            console.log(`TOKENS - ${tokens}`);
            saveToStorage('accessToken',tokens.accessToken)
            store.dispatch(updateToken(tokens.refreshToken))
        } catch (error) {
            
        }
    }
    throw error;
})

export {$api, $apiAuth}