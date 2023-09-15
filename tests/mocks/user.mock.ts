import bcryptUtil from '../../src/utils/bcrypt.util';

const bodyWithoutUsername = {
  password: '123'
}

const bodyWithUsernameEmpty = {
  username: '',
  password: '123'
}

const bodyWithoutPassword = {
  username: 'userTeste'
}

const bodyComplete = {
  username: 'userTeste',
  password: '123'
}

const existingUser = { 
  id: 1, 
  username: 'userTeste',
  vocation: 'Guerreiro',
  level: 10,
  password: bcryptUtil.hash('123'),
};

export default {
  bodyWithoutUsername,
  bodyWithUsernameEmpty,
  bodyWithoutPassword,
  bodyComplete,
  existingUser
}