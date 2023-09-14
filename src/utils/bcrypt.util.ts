import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

function hash(string: string): string {
  return bcrypt.hashSync(string, SALT_ROUNDS);
}

export default {
  hash,
};