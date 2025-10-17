
import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
import logger from '../middlewares/logger/logger.js';
import crypto from 'crypto';
dotenv.config();


const decrypt = (encryptedText, secretKeyBuffer) => {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKeyBuffer, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const secretKey = Buffer.from(process.env.SECRET_KEY, 'base64');
const decryptedPassword = decrypt(process.env.DB_PASS_ENCRYPTED, secretKey);

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
   decryptedPassword,
    {
        host:process.env.DB_HOST,
        dialect:'mysql',
        logging:false,
    }
)

try{
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
}catch(error){
    logger.error(`Unable to connect to the database:,${error.message}`);
}

export default sequelize;