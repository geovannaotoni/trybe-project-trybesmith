import { Login } from '../types/Login';
import { ServiceResponseError } from '../types/ServiceResponse';

const validateLogin = (login: Login): ServiceResponseError | void => {
  const { username, password } = login;

  if (!username || !password) {
    return { status: 'BAD_REQUEST', data: { message: '"username" and "password" are required' } };
  }
};

export default validateLogin;