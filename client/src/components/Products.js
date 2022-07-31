import React from "react";
import { graphql } from "@apollo/client/react/hoc";

import { FETCH_PRODUCTS } from "../query/queries";
import { store } from "../state/store";
import ProductCard from "./ProductCard";
import { ProductGrid } from "./styles/Products.styled";

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: store.getState().category,
      loading: this.props.data.loading,
      products: [],
    };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        category: store.getState().category,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  displayProductsOnCategory() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    let category = 0;
    if (this.state.category === "all") category = 0;
    if (this.state.category === "clothes") category = 1;
    if (this.state.category === "tech") category = 2;

    const products = this.props.data.categories[category].products.map(
      (product, i) => (
        <div key={i} id={i}>
          <ProductCard cardId={i} key={i} product={product} />
        </div>
      )
    );

    return products;
  }
  render() {
    return <ProductGrid>{this.displayProductsOnCategory()}</ProductGrid>;
  }
}

const getProducts = graphql(FETCH_PRODUCTS);

export default getProducts(Products);
