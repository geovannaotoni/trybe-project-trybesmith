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

export default {
  sign,
};