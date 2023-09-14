import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import { ServiceResponse } from '../types/ServiceResponse';
import { Login } from '../types/Login';
import { Token } from '../types/Token';
import validateLogin from '../validations/validateLogin';
import UserModel from '../database/models/user.model';

async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  const error = validateLogin(login);
  if (error) return error;

  const foundUser = await UserModel.findOne({ where: { username: login.username } });
  if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundUser.dataValues;
  const token = jwtUtil.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
}
export default {
  verifyLogin,
};