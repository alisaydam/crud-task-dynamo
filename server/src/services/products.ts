import AWS from "aws-sdk";
import type { Product } from "../entities/product";

export default class ProductService {
  constructor(
    private readonly dynamoDbClient: AWS.DynamoDB.DocumentClient,
    private readonly TABLE_NAME: string
  ) {}

  async getAll(): Promise<[Product]> {
    console.log("get all");
    const params = {
      TableName: this.TABLE_NAME,
    };
    const result = await this.dynamoDbClient.scan(params).promise();
    return result.Items as [Product];
  }

  async create(product: Product): Promise<Product> {
    console.log("create");
    await this.dynamoDbClient
      .put({
        TableName: this.TABLE_NAME,
        Item: product,
      })
      .promise();
    return product;
  }

  async update(id: string, partialProduct: Partial<Product>): Promise<Product> {
    console.log("updated");

    const updated = await this.dynamoDbClient
      .update({
        TableName: this.TABLE_NAME,
        Key: { uniqueID: id },
        UpdateExpression: "set #count = :count, attributes = :attributes",
        ExpressionAttributeNames: {
          "#count": "count",
        },
        ExpressionAttributeValues: {
          ":count": partialProduct.count,
          ":attributes": partialProduct.attributes,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as Product;
  }

  async delete(uniqueID: string) {
    console.log("deleted");
    return this.dynamoDbClient
      .delete({
        TableName: this.TABLE_NAME,
        Key: { uniqueID },
      })
      .promise();
  }
}
