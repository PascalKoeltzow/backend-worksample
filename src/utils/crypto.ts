import crypto from 'crypto';

export const generateRandomString = () => crypto.randomBytes(128).toString('base64');
export const hashPassword = (password: string, salt: string) => {return crypto.createHmac('sha256', [salt, password].join('/')).digest('hex')};