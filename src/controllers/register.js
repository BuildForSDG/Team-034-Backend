import { v4 as uuidv4 } from 'uuid';
import users from '../models/users';
import validations from '../middlewares/validations';
import utils from '../helpers/commons';

/**
 * @function signup
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns json
 */

const signup = (req, res) => {
  const {
    username, email, password, confirmPassword
  } = req.body;

  const result = validations.validateRegister(req.body);

  if (result.error) {
    const errorMessage = result.error.details[0].message;

    return res.status(400).json({
      status: 400,
      error: errorMessage.replace(/[^a-zA-Z ]/g, ''),
    });
  }

  const foundEmail = utils.searchByEmail(email, users);
  if (foundEmail) {
    return res.status(400).json({
      status: 400,
      error: 'Email already exist',
    });
  }

  const userData = {
    id: uuidv4(),
    email: email,
    username: username,
    password: utils.hashPassword(password),
    isAdmin: false,
  };

  users.push(userData);

  const token = utils.jwtToken(userData);

  return res.header('Authorization', `${token}`).status(201).json({
    status: 201,
    data: {
      token,
      id: userData.id,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      isAdmin: userData.isAdmin,
    },
  });
};

export default signup;
