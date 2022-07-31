export interface Product {
  id: String;
  brand: String;
  name: String;
  prices: Array<Object>;
  gallery: Array<String>;
  uniqueID: String;
  description: String;
  attributes: Object;
  attributeSets: Array<Object>;
  count: Number;
}
