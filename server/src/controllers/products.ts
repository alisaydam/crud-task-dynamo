import ProductService from "../services/products";
import { Request, Response } from "express";
import dynamoDbClient, { PRODUCTS_TABLE } from "../db/dynamo";

const productsService = new ProductService(dynamoDbClient, PRODUCTS_TABLE);

export class ProductController {
  async create(req: Request, res: Response) {
    try {
      const product = await productsService.create(req.body);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const products = await productsService.getAll();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  }
  async update(req: Request, res: Response) {
    const id = req.body.uniqueID;
    const body = req.body;
    try {
      const product = await productsService.update(id, body);
      const products = await productsService.getAll();

      res.json(products);
    } catch (error) {
      console.log(error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      console.log(req.params.uniqueID);
      const product = await productsService.delete(req.params.uniqueID);
      const products = await productsService.getAll();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  }
}
