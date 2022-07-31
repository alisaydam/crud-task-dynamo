import { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { nanoid } from "@reduxjs/toolkit";
import { Wrapper } from "../components/Details.styled";
import "../components/styles/Details.css";
import { store } from "../state/store";
import { connect } from "react-redux";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      showToastErr: false,
      attributeGroup: nanoid(),
      currency: store.getState().selectedCurrency,
      productData: {},
    };
  }
  createProduct(item) {
    const productData = {
      uniqueID: nanoid(),
      id: item.id,
      brand: item.brand,
      name: item.name,
      prices: item.prices,
      gallery: item.gallery,
      description: item.description,
      attributeSets: item.attributes,
      attributes: {},
      count: 1,
    };

    item.attributes.forEach((attribute) => {
      productData.attributes[attribute.name] = "";
    });
    this.setState({
      productData: productData,
    });
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        currency: store.getState().selectedCurrency,
      });
    });
  }
  handlechange = (e, { name, value, item }) => {
    this.createProduct(item);
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
  addToCart = async () => {
    if (!this.state.productData.id) {
      this.setState({ showToastErr: true });

      setTimeout(() => {
        this.setState({ showToastErr: false });
      }, 1000);
      return;
    }
    const response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.productData),
    });
    const data = await response.json();
    console.log(data);
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
    this.setState({ showToast: true });

    setTimeout(() => {
      this.setState({ showToast: false });
    }, 1000);
  };

  render() {
    let id = window.location.search.substring(1);

    const FETCH_ONE_PRODUCT = gql`
  {
    product(id: ${JSON.stringify(id)}) {
      name
      description
      brand
      id
      inStock
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
    }
  }
`;
    return (
      <>
        <Wrapper>
          <Query query={FETCH_ONE_PRODUCT}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error...</div>;
              if (data) {
                const item = data.product;
                const description = item.description;
                let bigImage = item.gallery[0];
                const price = item.prices.find((x) => {
                  return x.currency.symbol === this.state.currency;
                });
                return (
                  <div className="container">
                    <div className="small-gallery">
                      {item.gallery.map((x, i) => (
                        <div
                          className="s-gallery-item"
                          onClick={() => {
                            document.querySelector("#big-image").src = x;
                            bigImage = "dwad";
                          }}
                        >
                          <img className="images" src={x} alt="dwadwadaw" />
                        </div>
                      ))}
                    </div>
                    <div className="big-display">
                      <img
                        className="images"
                        id="big-image"
                        src={bigImage}
                        alt="imagesss"
                      />
                    </div>
                    <div className="about-product">
                      <p className="brand">{item.brand}</p>
                      <p className="name">{item.name}</p>
                      {item.attributes.map((x) => {
                        const attributeName = nanoid();
                        return (
                          <>
                            <p className="attribute-name">{x.name + ":"}</p>
                            <div className="arrribute-row">
                              {x.items.map((y) => {
                                const inputId = nanoid();
                                return (
                                  <>
                                    <input
                                      type="radio"
                                      name={attributeName}
                                      id={inputId}
                                      onClick={(e) =>
                                        this.handlechange(e, {
                                          name: x.name,
                                          value: y.value,
                                          item: item,
                                        })
                                      }
                                    />
                                    <label
                                      name={x.name}
                                      value={y.value}
                                      className={
                                        x.type === "text"
                                          ? "border inputlabel"
                                          : "inputlabel"
                                      }
                                      htmlFor={inputId}
                                      style={
                                        x.type === "swatch"
                                          ? {
                                              backgroundColor: y.value,
                                              padding: "4px 10px",
                                            }
                                          : {}
                                      }
                                    >
                                      {x.type === "swatch" ? `ㅤ` : y.value}
                                    </label>
                                  </>
                                );
                              })}
                            </div>
                          </>
                        );
                      })}

                      <p className="price-text">PRICE:</p>
                      <p className="price">
                        {price.currency.symbol + "" + price.amount}
                      </p>
                      <button
                        className="add-to-cart-button"
                        onClick={this.addToCart}
                      >
                        {this.state.showToastErr && (
                          <div className="toast-err">
                            Plese select at least one attribute
                          </div>
                        )}
                        {this.state.showToast && (
                          <div className="toast">Added to cart</div>
                        )}
                        ADD TO CART
                      </button>
                      <div className="description">
                        <div
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            }}
          </Query>
        </Wrapper>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productData) => dispatch({ type: "add-to-cart", productData }),
  };
};
export default connect(null, mapDispatchToProps)(Details);
