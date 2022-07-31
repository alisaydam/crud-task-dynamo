import { Component } from "react";
import {
  ProductCardWrapper,
  ProductImage,
  ProductName,
  ProductPrice,
  AddToCardIcon,
  OutOfStock,
  OutOfStockModal,
  Toast,
} from "./styles/Products.styled";
import { store } from "../state/store";
import { nanoid } from "@reduxjs/toolkit";
import ProductAttributes from "./ProductCardAtributes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      currency: store.getState().selectedCurrency,
      productData: {},
    };
    this.addToCart = this.addToCart.bind(this);
  }

  createProduct() {
    const productData = {
      uniqueID: nanoid(),
      id: this.props.product.id,
      brand: this.props.product.brand,
      name: this.props.product.name,
      prices: this.props.product.prices,
      gallery: this.props.product.gallery,
      description: this.props.product.description,
      attributes: {},
      attributeSets: this.props.product.attributes,
      count: 1,
    };

    this.props.product.attributes.forEach((attribute) => {
      productData.attributes[attribute.name] = "";
    });
    this.setState({
      productData: productData,
    });
  }

  componentDidMount() {
    this.createProduct();
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        currency: store.getState().selectedCurrency,
      });
    });
  }

  handleAttributeSelect = (data) => {
    let { name, value } = data;
    this.setState((prevState, props) => ({
      productData: {
        ...prevState.productData,
        attributes: {
          ...this.state.productData.attributes,
          [name]: value,
        },
      },
    }));
  };
  addToCart = async (e) => {
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.productData),
    });
    const data = await response.json();
    this.props.addToCart(this.state.productData);
    this.setState((prevState, props) => ({
      productData: {
        ...prevState.productData,
        count: 1,
      },
    }));
    this.setState({ showToast: true });

    setTimeout(() => {
      this.setState({ showToast: false });
    }, 1500);
    this.createProduct();
  };

  render() {
    const { name, gallery, attributes, prices, inStock, brand } =
      this.props.product;
    const price = prices.find((x) => {
      return x.currency.symbol === this.state.currency;
    });
    return (
      <>
        <ProductCardWrapper>
          {!inStock && (
            <OutOfStockModal>
              <OutOfStock>Out Of Stock</OutOfStock>
            </OutOfStockModal>
          )}
          <div style={{ position: "relative" }}>
            {this.state.showToast && <Toast>Added to cart</Toast>}
            <Link
              to={{
                pathname: "/product",
                search: this.props.product.id,
              }}
            >
              <ProductImage src={gallery[0]} />
            </Link>

            {inStock && (
              <AddToCardIcon onClick={this.addToCart}>
                <img src="empty-cart.png" alt="cart" />
              </AddToCardIcon>
            )}
          </div>
          <Link to="product" state={{ prod: this.props.product.id }}>
            <ProductName>{brand + " - " + name}</ProductName>
          </Link>

          {attributes.map((attribute, i) => {
            return (
              <ProductAttributes
                getValues={this.handleAttributeSelect}
                key={i}
                attribute={attribute}
              />
            );
          })}
          <ProductPrice>
            {price.currency.symbol + "" + price.amount}
          </ProductPrice>
        </ProductCardWrapper>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productData) => dispatch({ type: "add-to-cart", productData }),
  };
};
export default connect(null, mapDispatchToProps)(ProductCard);
