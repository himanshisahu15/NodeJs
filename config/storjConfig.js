import {S3Client} from '@aws-sdk/client-s3'
import dotenv from "dotenv";
dotenv.config();

const s3Client=new S3Client({
  region: process.env.STORJ_REGION, 
    endpoint: process.env.STORJ_ENDPOINT, 
    credentials: {
        accessKeyId: process.env.STORJ_ACCESS_KEY,
        secretAccessKey: process.env.STORJ_SECRET_KEY
    },
    forcePathStyle: true // Required for Storj S3 compatibility
})


export {s3Client};