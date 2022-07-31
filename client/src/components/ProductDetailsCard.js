import { Component } from "react";
import {
  DetailsCard,
  AboutSection,
  ProductBrand,
  ProductName,
  ProductPrice,
  GallerySection,
  ProductCountUpdate,
  ProductCount,
  CountWrap,
  ImageWrap,
  ArrowsWrap,
} from "./styles/DetailsCard.styled";
import { store } from "../state/store";
import DetailsCardAttributes from "./DetailsCardAttributes";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      displayedImage: 0,
      cart: [],
      currency: store.getState().selectedCurrency,
      productData: {},
    };
  }

  handleAttributeSelect = async (attributeValues, count = 0) => {
    let { name, value } = attributeValues;
    await this.setState((prevState, props) => ({
      productData: {
        ...prevState.productData,
        count: this.props.item.count,
        attributes: {
          ...this.state.productData.attributes,
          [name]: value,
        },
      },
    }));
    const res = await fetch("http://localhost:3000/api", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.productData),
    });
    const data = await res.json();
    this.props.parentCallback(data);
  };

  createProduct() {
    const productData = {
      ...this.props.item,
    };
    this.setState({
      productData: productData,
    });
  }

  componentDidMount() {
    this.createProduct();
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        cart: store.getState().cartStore,
      });
    });
  }
  changeImage = (e) => {
    const galleryLegnth = this.state.productData.gallery.length - 1;
    if (e.target.id === "+") {
      if (this.state.displayedImage === galleryLegnth)
        return this.setState({ displayedImage: 0 });
      this.setState({ displayedImage: this.state.displayedImage + 1 });
      return;
    }
    this.setState({ displayedImage: this.state.displayedImage - 1 });
    if (this.state.displayedImage === 0) {
      this.setState({
        displayedImage: galleryLegnth,
      });
    }
  };

  handleCount = async (e) => {
    let number = this.state.productData.count;
    e.target.id === "+" ? (number = 1) : (number = -1);

    await this.setState((prevState, props) => ({
      productData: {
        ...prevState.productData,
        count: this.state.productData.count + number,
      },
    }));
    const res = await fetch("http://localhost:3000/api", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.productData),
    });
    const data = await res.json();
    console.log(data);
    this.props.parentCallback(data);
  };
  deleteItem = async () => {
    const res = await fetch(
      "http://localhost:3000/api/" + this.props.item.uniqueID,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.productData),
      }
    );
    const data = await res.json();
    this.props.parentCallback(data);
  };

  render() {
    const { name, brand, prices } = this.props.item;

    const price = prices.find((x) => {
      return x.currency.symbol === this.state.currency;
    });
    const item = this.props.item;
    const selectedAttributes = Object.entries(item.attributes);
    return (
      <DetailsCard baseSize={this.props.baseSize}>
        <AboutSection baseSize={this.props.baseSize}>
          <ProductBrand>{brand}</ProductBrand>
          <ProductName>{name}</ProductName>
          <ProductPrice>
            {price.currency.symbol + "" + price.amount}
          </ProductPrice>
          <div>
            {item.attributeSets.map((attribute, i) => {
              return (
                <div>
                  <DetailsCardAttributes
                    baseSize={this.props.baseSize}
                    getValues={this.handleAttributeSelect}
                    key={i}
                    attribute={attribute}
                    selectedAttribute={selectedAttributes[i]}
                  />
                </div>
              );
            })}
          </div>
        </AboutSection>
        <GallerySection baseSize={this.props.baseSize}>
          <CountWrap baseSize={this.props.baseSize} onClick={this.handleCount}>
            <ProductCountUpdate baseSize={this.props.baseSize} id="+">
              +
            </ProductCountUpdate>
            <ProductCount baseSize={this.props.baseSize}>
              {this.props.item.count}
            </ProductCount>
            <ProductCountUpdate baseSize={this.props.baseSize}>
              -
            </ProductCountUpdate>
          </CountWrap>
          <ImageWrap>
            <img
              src="/trash-bin.png"
              alt="trash"
              style={{
                position: "absolute",
                zIndex: 9,
                bottom: 0,
                left: 0,
                cursor: "pointer",
              }}
              onClick={this.deleteItem}
            />
            <div style={{ position: "relative" }}>
              <img
                src={item.gallery[this.state.displayedImage]}
                style={{ height: "100%" }}
                alt={item.id}
              />
              <ArrowsWrap onClick={this.changeImage}>
                {item.gallery.length > 1 && (
                  <>
                    <img src="left-arrow.png" alt="arrow" id="-" />
                    <img src="right-arrow.png" alt="arrow" id="+" />
                  </>
                )}
              </ArrowsWrap>
            </div>
          </ImageWrap>
        </GallerySection>
      </DetailsCard>
    );
  }
}

export default ProductDetails;
