const jwt = require('jsonwebtoken')
const pool = require('../db')
const ApiError = require('../exceptions/api-error')

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    try {
      const savedToken = await pool.query(
        `INSERT INTO tokens (user_id,refresh_token) values ($1,$2) RETURNING*;`,
        [userId, refreshToken]
      );

      return savedToken.rows[0];
    } catch (error) {
      return ApiError.BadRequest();
    }
  }
  generateAccessToken(payload) {
    const token = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "30m",
    });
    return token;
  }
  async findToken(refreshToken) {
    const token = await pool.query(
      `SELECT * FROM tokens WHERE refresh_token = $1`,
      [refreshToken]
    );
    return token.rows[0];
  }
  validateRefreshToken(token) {
    console.log(typeof String(token));
    const isTokenValid = jwt.verify(token, process.env.REFRESH_SECRET);
    return isTokenValid;
  }
  validateAccessToken(token) {
    try {
      const isTokenValid = jwt.verify(token, process.env.ACCESS_SECRET);
      return isTokenValid;
    } catch (error) {
      return false
    }
  }
}


module.exports = new TokenService()