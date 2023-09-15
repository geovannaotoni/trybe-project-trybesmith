import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function extractToken(authorization: string): string {
  return authorization.split(' ')[1];
}

function verify(authorization: string): TokenPayload {
  const token = extractToken(authorization);
  const decoded = jwt.verify(token, secret);
  return decoded as TokenPayload;
}

export default {
  sign,
  verify,
};