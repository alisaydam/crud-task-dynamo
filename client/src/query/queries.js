import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
  query {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        description
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          type
          name
          items {
            value
            displayValue
            id
          }
        }
      }
    }
  }
`;
 