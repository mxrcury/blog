import { AxiosError } from "axios";
import { $apiAuth } from "../api/api";

class authService {
    async register(username: string, email: string, password: string) {
        const userData = { username, email, password };
        const registeredUser = await $apiAuth.post("/auth/register", userData);

        return registeredUser.data;
    }
    async login(username: string, email: string, password: string) {
        const user = { username, email, password };
        try {
            const logginnedUser = await $apiAuth.post("/auth/login", user);
            return logginnedUser.data;
        } catch (error) {
            return { error };
        }
    }
    async logout() {
        await $apiAuth.get("/auth/logout");
    }
}

type User = {
    username: string;
    email: string;
    password: string;
};

export default new authService();
