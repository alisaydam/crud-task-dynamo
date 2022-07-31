"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    constructor(dynamoDbClient, TABLE_NAME) {
        this.dynamoDbClient = dynamoDbClient;
        this.TABLE_NAME = TABLE_NAME;
    }
    async getAll() {
        console.log("get all");
        const params = {
            TableName: this.TABLE_NAME,
        };
        const result = await this.dynamoDbClient.scan(params).promise();
        return result.Items;
    }
    async create(product) {
        console.log("create");
        await this.dynamoDbClient
            .put({
            TableName: this.TABLE_NAME,
            Item: product,
        })
            .promise();
        return product;
    }
    async update(id, partialProduct) {
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
        return updated.Attributes;
    }
    async delete(uniqueID) {
        console.log("deleted");
        return this.dynamoDbClient
            .delete({
            TableName: this.TABLE_NAME,
            Key: { uniqueID },
        })
            .promise();
    }
}
exports.default = ProductService;
