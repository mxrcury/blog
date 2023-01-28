const ApiError = require("../exceptions/api-error");
const UserService = require("../services/user-service");

class UserController {
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            if (!req.body) {
                res.json(ApiError.BadRequest(`You didnt enter any data`));
            }
            const user = await UserService.register(username, email, password);
            if (!user) {
                res.json(ApiError.BadRequest());
            }
            res.json({ status: "ok", message: `User has been registered` });
        } catch (error) {
            res.json(error);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { username, email, password } = req.body;

            const loggedInUser = await UserService.login(username, email, password);

            console.log(`LOGIN`, loggedInUser.refreshToken);
            res.cookie("refreshToken", loggedInUser.refreshToken);
            return res.json(loggedInUser);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie("refreshToken");
            res.json(`User has been logged out!`);
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const refreshedTokens = await UserService.refresh(refreshToken);
            res.json(refreshedTokens);
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req, res, next) {
        try {
            const { page = 1 } = req.query;
            const users = await UserService.getUsers(page);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    async getOneUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getOneUser(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async addComment(req, res, next) {
        try {
            const comment = req.body;
            const addedComment = await UserService.addComment(comment);
            res.json({ status: "ok", message: `Comment was added`, comment: addedComment });
        } catch (error) {
            next(error);
        }
    }
    async editProfile(req, res, next) {
        try {
            const options = req.body;
            const { user } = req;
            await UserService.editProfile(options, user);
            res.json({ status: "ok", message: `Options were updated` });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
