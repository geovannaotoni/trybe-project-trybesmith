import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcryptUtil from '../../../src/utils/bcrypt.util';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/user.mock';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Retorna 400 se não enviar username', async function () {
    const response = await chai.request(app).post('/login').send(userMock.bodyWithoutUsername);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Retorna 400 se não enviar password', async function () {
    const body = {
      username: 'userTeste'
    }
    const response = await chai.request(app).post('/login').send(userMock.bodyWithoutPassword);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Retorna 401 se o username não existir no banco', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(userMock.bodyComplete) ;
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Username or password invalid' });
  });

  it('Retorna 401 se o username existir mas senha estiver errada', async function () {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      username: 'userTeste',
      vocation: 'Guerreiro',
      level: 10,
      password: bcryptUtil.hash('456'),
    }));

    const response = await chai.request(app).post('/login').send(userMock.bodyComplete); 
    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Username or password invalid' });
  })

  it('Retorna 200 se credenciais estiverem corretas', async function () {
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build({
      username: 'userTeste',
      vocation: 'Guerreiro',
      level: 10,
      password: bcryptUtil.hash('123'),
    }));

    const response = await chai.request(app).post('/login').send(userMock.bodyComplete);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  })
});
