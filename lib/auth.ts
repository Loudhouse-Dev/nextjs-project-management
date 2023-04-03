import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword, hashedPassword) =>
	bcrypt.compare(plainTextPassword, hashedPassword);

export const createJWT = (user) => {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;

	return new SignJWT({ payload: { id: user.id, email: user.email } });
};
