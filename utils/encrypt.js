import crypto from 'crypto';

const generateSecretKey = () => {
  return crypto.randomBytes(32); // 256-bit secret key
};

const encrypt = (text, secretKeyBuffer) => {
  const iv = crypto.randomBytes(16); // 16 bytes IV for AES
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKeyBuffer, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};
const dbPassword = 'Himanshi@123';

// generate a secret key 
const secret = generateSecretKey();

// encrypt the password using the secret key
const encrypted = encrypt(dbPassword, secret);

console.log('SECRET_KEY:\n', secret.toString('base64'));
console.log('\nDB_PASS_ENCRYPTED :\n', encrypted);