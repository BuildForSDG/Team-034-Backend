import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

const utils = {
  /**
     * @description assign token
     * @param {object} payload
     * @returns {object} token
     */
  jwtToken(payload) {
    const token = jwt.sign(payload, SECRET, { expiresIn: '24h' });
    return token;
  },

   /**
   * @description hash password
   * @param {object} password
   * @returns {object} hashPassword
   */
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  },

  /**
   * @description - search by email
   * @param {string} email
   * @param {object} data
   * @returns {object} foundEmail
   */
  searchByEmail(searchEmail, data) {
    const foundEmail = data.find(eachData => eachData.email === searchEmail);
    return foundEmail;
  },
}

export default utils;
