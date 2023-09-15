import { expect } from 'chai';
import sinon from 'sinon';
import userMock from '../../mocks/user.mock';
import loginService from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('ao não receber o username, retorna um erro', async function () {
    const parameters = userMock.bodyWithUsernameEmpty;

    const serviceResponse = await loginService.verifyLogin(parameters);

    expect(serviceResponse.status).to.be.equal('BAD_REQUEST');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"username" and "password" are required' });
  });

  it('ao receber um e-mail e uma senha válida, retorna um token de login', async function () {
    // Arrange
    const parameters = userMock.bodyComplete;
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock.existingUser));

    // Act
    const serviceResponse = await loginService.verifyLogin(parameters);

    // Assert
    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.have.key('token');
  });
});
