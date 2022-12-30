import { $api } from "../api/api";

class UserService {
    async getUsers(page) {
        const users = await $api.get(`/users?page=${page}`)
        return users.data
    }
    async getUser(userId){
        const user = await $api.get(`/users/${userId}`)
        return user.data
    }
}
export default new UserService()