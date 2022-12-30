import { $apiAuth } from '../api/api'

class authService {

    async register(username,email,password){
        const userData = {username,email,password}
        const registeredUser = await $apiAuth.post('/auth/register',userData)
        
        return registeredUser.data
    }
    async login(username,email,password) {
        const userData = {username,email,password}
        const registeredUser = await $apiAuth.post('/auth/login',userData)        
        return registeredUser.data

    }
    async logout() {
        await $apiAuth.get('/auth/logout')
    }
}

export default new authService()