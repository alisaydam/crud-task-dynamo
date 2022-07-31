import AWS from "aws-sdk";
import { config } from "dotenv";
config();

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDbClient: AWS.DynamoDB.DocumentClient =
  new AWS.DynamoDB.DocumentClient();

export const PRODUCTS_TABLE = process.env.TABLE as string;

export default dynamoDbClient;
