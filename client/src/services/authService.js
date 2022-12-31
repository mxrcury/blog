import { $apiAuth } from '../api/api'

class authService {

    async register(username,email,password){
        const userData = {username,email,password}
        const registeredUser = await $apiAuth.post('/auth/register',userData)
        
        return registeredUser.data
    }
    async login(username,email,password) {
        const userData = {username,email,password}
        try {
            const logginnedUser = await $apiAuth.post('/auth/login',userData)        
            return logginnedUser.data                
        } catch (error) {            
            return {error:error.response.data}
        }

    }
    async logout() {
        await $apiAuth.get('/auth/logout')
    }
}

export default new authService()