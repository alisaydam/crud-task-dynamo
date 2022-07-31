import { Component } from "react";
import { connect } from "react-redux";
import ProductDetailsCard from "../components/ProductDetailsCard";
import {
  TotalWrapper,
  Section,
  Item,
  ItemBold,
  OrderButton,
} from "../components/styles/Cart.styled";
import {
  DetailsWrapCartPage,
  CartDetailsLimiter,
} from "../components/styles/DetailsCard.styled";
import { store } from "../state/store";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: store.getState().cartStore,
      currency: store.getState().selectedCurrency,
    };
  }
  async componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        cart: store.getState().cartStore,
      });
    });
    try {
      const res = await fetch("http://localhost:3000/api");
      if (!res.ok) throw Error(res.statusText);
      const data = await res.json();
      this.setState({ total: this.findTotal(data) });
      this.props.cartUpdate(data);
    } catch (error) {
      console.log(error);
    }
  }

  updateProducts = (data) => {
    this.props.cartUpdate(data);
    this.setState({ total: this.findTotal(data) });
  };
  findTotal = (arr) => {
    const total = arr
      .map((x) => {
        return (
          x.prices.find(
            (y) =>
              y.currency.symbol === localStorage.getItem("preferredCurrency")
          ).amount * x.count
        );
      })
      .reduce((a, b) => {
        return a + b;
      }, 0)
      .toFixed(2);
    return total;
  };

  render() {
    return (
      <>
        <DetailsWrapCartPage>
          {/* {this.state.cart.cart.length === 0 && <div>Loading...</div>} */}
          <div
            style={{
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "32px",
              marginTop: "80px",
              marginBottom: "50px",
            }}
          >
            CART
          </div>
          {this.state.cart.map((product, i) => {
            return (
              <CartDetailsLimiter>
                <ProductDetailsCard
                  parentCallback={this.updateProducts}
                  baseSize={10}
                  key={i}
                  item={product}
                />
              </CartDetailsLimiter>
            );
          })}
          {this.state.cart.length > 0 ? (
            <TotalWrapper>
              <Section>
                <Item>Tax 21%: </Item>
                <Item>Quantity:</Item>
                <Item>Total:</Item>
              </Section>
              <Section>
                <ItemBold>
                  {((this.state.total / 100) * 21).toFixed(2) || 0}{" "}
                  {this.state.currency}
                </ItemBold>
                <ItemBold>{this.state.cart.length}</ItemBold>
                <ItemBold>
                  {((this.state.total / 100) * 21 + +this.state.total).toFixed(
                    2
                  ) || 0}{" "}
                  {this.state.currency}
                </ItemBold>
              </Section>
            </TotalWrapper>
          ) : (
            <TotalWrapper>
              <Section>
                <Item>There is no items in the cart! </Item>
              </Section>
            </TotalWrapper>
          )}
          <OrderButton>ORDER</OrderButton>
        </DetailsWrapCartPage>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cartUpdate: (data) => dispatch({ type: "cart-update", data }),
  };
};

export default connect(null, mapDispatchToProps)(Cart);
