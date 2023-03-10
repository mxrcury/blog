const uuid = require("uuid");
const bcrypt = require("bcrypt");
const pool = require("../db");
const ApiError = require("../exceptions/api-error");
const TokenService = require("./token-service");
const UserDto = require("../dto/user-dto");
const { camelToSnakeCaseParser } = require("../utils/parsers");

class UserService {
    async register(username, email, password) {
        const userExists = await pool.query(`SELECT * FROM users WHERE username = $1 OR email = $2;`, [username, email]);
        if (userExists.rows[0]) {
            throw ApiError.UnAuthorizated(`User with email <${email}> and username <${username}> already exists!`);
        }
        const activationLink = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 6);
        const registeredUser = await pool.query(
            `INSERT INTO users (username,email,password,activation_link) values ($1,$2,$3,$4) RETURNING*;`,
            [username, email, hashedPassword, activationLink]
        );
        if (!registeredUser.rows[0]) {
            throw ApiError.BadRequest();
        }
        const user = new UserDto(registeredUser.rows[0]);
        const tokens = await TokenService.generateTokens({ ...user });
        await TokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user,
        };
    }
    async login(username, email, password) {
        let tokens;
        const userData = await pool.query(`SELECT * FROM users WHERE username = $1 AND email = $2`, [username, email]);
        const userExists = userData.rows[0];
        if (!userExists) {
            throw ApiError.BadRequest(`User with email <${email}> and username <${username}> doesn't exists!`);
        }
        const isValidPass = await bcrypt.compare(password, userData.rows[0].password);
        if (!isValidPass) {
            throw ApiError.BadRequest(`Wrong password`);
        }
        const user = new UserDto(userData.rows[0]);
        const userRefreshToken = await pool.query(`SELECT * FROM tokens WHERE user_id = $1`, [user.id]);
        const isRefreshTokenValid = () => {
            if (userRefreshToken.rows[0].refresh_token) {
                return TokenService.validateRefreshToken(userRefreshToken.rows[0].refresh_token);
            }
            return false;
        };
        if (!isRefreshTokenValid) {
            tokens = await TokenService.generateTokens({ ...user });
        }
        if (isRefreshTokenValid) {
            const accessToken = await TokenService.generateAccessToken({ ...user });
            tokens = {
                accessToken,
                refreshToken: userRefreshToken.rows[0].refresh_token,
            };
        }
        return {
            ...tokens,
            user,
        };
    }
    async logout(refreshToken) {
        // delete if token during logout is expired
        const tokenFromDb = await pool.query(`SELECT * FROM tokens WHERE refresh_token = $1;`, [refreshToken]);
        if (!tokenFromDb.rows[0]) {
            return { message: `No such token was found` };
        }
        const isTokenValid = TokenService.validateRefreshToken(tokenFromDb.rows[0].refresh_token);
        if (!isTokenValid) {
            await pool.query(`DELETE FROM tokens WHERE refresh_token = $1`, [tokenFromDb.rows[0].refresh_token]);
        }
        return;
    }
    async refresh(refreshToken) {
        let tokens = {};
        const refreshTokenFromDb = await TokenService.findToken(refreshToken);
        if (!refreshTokenFromDb) {
            throw ApiError.BadRequest(`Such token was not found`);
        }
        const isRefreshTokenValid = TokenService.validateRefreshToken(refreshTokenFromDb.refresh_token);
        const userData = isRefreshTokenValid;
        const user = new UserDto(userData);
        if (!isRefreshTokenValid) {
            tokens = await TokenService.generateTokens({ ...user });
            await TokenService.saveToken(refreshTokenFromDb.rows[0].user_id, tokens.refreshToken);
            return tokens;
        }
        const accessToken = TokenService.generateAccessToken({ ...user });
        tokens = { accessToken, refreshToken: refreshTokenFromDb.refresh_token };
        return tokens;
    }
    async getUsers(page) {
        const rowsNumber = 5;
        const usersResponse = await pool.query(
            `SELECT username,email, job_position, skills, company_name, id, age,email FROM users ORDER BY id DESC OFFSET ($1 - 1)*$2 FETCH NEXT $3 ROWS ONLY;`,
            [page, rowsNumber, rowsNumber]
        );

        const users = usersResponse.rows.map((user) => {
            const updatedUser = { ...user, jobPosition: user.job_position, companyName: user.company_name };
            delete updatedUser.job_position;
            delete updatedUser.company_name;
            return updatedUser;
        });
        const usersCounts = await pool.query(`SELECT * FROM users;`);
        return { results: users, totalCounts: usersCounts.rows.length };
    }
    async getOneUser(userId) {
        const userData = await pool.query(`SELECT * FROM users WHERE id = $1;`, [userId]);
        const user = new UserDto({ ...userData.rows[0] });
        const userComments = await pool.query(`SELECT * FROM user_comments WHERE user_id = $1 ORDER BY id DESC;`, [
            user.id,
        ]);

        delete user.password;
        delete user.activationLink;
        // TODO: Refactor and add DTO for comments
        return {
            ...user,
            comments: userComments.rows.map((comment) => {
                const updatedComment = {
                    ...comment,
                    createdAt: comment.created_at,
                    createdBy: comment.created_by,
                };
                delete updatedComment.created_at;
                delete updatedComment.created_by;
                return updatedComment;
            }),
        };
    }
    async addComment(comment) {
        const { userId, createdBy, createdAt, text } = comment;
        const commentData = await pool.query(
            `INSERT INTO user_comments (user_id,created_by,created_at,text) values ($1,$2,$3,$4) RETURNING*;`,
            [userId, createdBy, createdAt, text]
        );
        if (!commentData.rows[0]) {
            return ApiError.BadRequest();
        }

        const addedComment = {
            ...commentData.rows[0],
            userId: commentData.rows[0].user_id,
            createdBy: commentData.rows[0].created_by,
            createdAt: commentData.rows[0].created_at,
        };
        delete addedComment.created_by;
        delete addedComment.created_at;
        delete addedComment.user_id;
        return addedComment;
    }
    async editProfile(options, currentUserData) {
        let optionsCount = 0;
        const optionsList = Object.entries(options)
            .map((option, i) => {
                optionsCount += 1;
                let parsedOption = camelToSnakeCaseParser(option[0]);
                return `${parsedOption} = $${i + 1}`;
            })
            .join(`, `);
        const optionsValues = Object.values(options).map((option) => {
            return option.value;
        });
        const updatedOptions = await pool.query(
            `UPDATE users SET ${optionsList} WHERE id = $${optionsCount + 1} RETURNING*;`,
            [...optionsValues, currentUserData.id]
        );

        return updatedOptions;
    }
}

module.exports = new UserService();
