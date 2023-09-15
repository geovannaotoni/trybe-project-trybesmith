import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/services/login.service';
import userMock from '../../mocks/user.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao não receber o username, retorna um erro', async function () {
    req.body = userMock.bodyWithoutUsername;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'BAD_REQUEST',
      data: { message: '"username" and "password" are required' },
    };

    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });

  it('ao receber um username e uma senha válida, retorna um token', async function () {
    req.body = userMock.bodyComplete;
    const token = { token: 't0k3nv4l1d4' };
    const serviceResponse: ServiceResponse<Token> = {
      status: 'SUCCESSFUL',
      data: token,
    };

    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(token);
  });
});
