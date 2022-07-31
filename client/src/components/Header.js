import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Nav,
  NavMenu,
  MenuItem,
  Modal,
  CardOverlay,
  CurrencyMenu,
  CurrencyMenuItem,
  CurrencyIcon,
  CartItemNumber,
  CartNumber,
  OverLayPositioner,
  OverlayLimiter,
  BoldTitle,
  Count,
  TotalWraper,
  CountWrapper,
  ViewBag,
  CheckoutButton,
} from "./styles/Header.styled";
import { Link } from "react-router-dom";
import ProductDetailsCard from "./ProductDetailsCard";
import { store } from "../state/store";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      isMenuOpen: false,
      showModal: false,
      cart: store.getState().cartStore,
      currency: store.getState().selectedCurrency,
    };
  }
  async componentDidMount() {
    if (!localStorage.getItem("preferredCurrency")) {
      localStorage.setItem("preferredCurrency", this.state.currency);
    }

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

  openCurrencySelect = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
    this.setState({ total: this.findTotal(this.state.cart) });
  };
  updateCurrency = (e) => {
    this.props.updateCurrency(e.target.value);
    this.setState({ currency: store.getState().selectedCurrency });
    this.setState({ isMenuOpen: false });
    this.props.updateCost("update");
  };

  toggleModal = (e) => {
    this.setState({ showModal: !this.state.showModal });
  };
  closeModal = (e) => {
    if (e.target.id === "modal") {
      this.setState({ showModal: false });
    }
  };

  updateProducts = (data) => {
    this.setState({ total: this.findTotal(data) });
    this.props.cartUpdate(data);
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
      <Nav>
        {this.state.showModal && (
          <Modal onClick={this.closeModal} id="modal">
            <OverLayPositioner id="modal">
              <CardOverlay>
                <CountWrapper>
                  <BoldTitle>My Bag, </BoldTitle>
                  <Count>&nbsp;{this.state.cart.length} &nbsp;items</Count>
                </CountWrapper>
                {this.state.cart.map((product, i) => (
                  <OverlayLimiter baseSize={5}>
                    <ProductDetailsCard
                      parentCallback={this.updateProducts}
                      baseSize={5}
                      key={i}
                      item={product}
                    />
                  </OverlayLimiter>
                ))}
                <TotalWraper>
                  <BoldTitle>Total</BoldTitle>
                  <BoldTitle>
                    {(
                      (this.state.total / 100) * 21 +
                      +this.state.total
                    ).toFixed(2) || 0}{" "}
                    {this.state.currency}
                  </BoldTitle>
                </TotalWraper>
                <TotalWraper>
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/cart"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    <ViewBag>VIEW BAG</ViewBag>
                  </Link>
                  <CheckoutButton>CHECKOUT</CheckoutButton>
                </TotalWraper>
              </CardOverlay>
            </OverLayPositioner>
          </Modal>
        )}
        <NavMenu>
          <MenuItem selected={true}>WOMEN</MenuItem>
          <MenuItem> MEN</MenuItem>
          <MenuItem> KIDS</MenuItem>
        </NavMenu>
        <Link to={`/`}>
          <div>
            <img src="/logo.png" alt="dd" />
          </div>
        </Link>

        <NavMenu>
          <MenuItem>
            {this.state.isMenuOpen && (
              <CurrencyMenu onClick={this.updateCurrency}>
                <CurrencyMenuItem value="$">$ USD</CurrencyMenuItem>
                <CurrencyMenuItem value="£">£ GPD</CurrencyMenuItem>
                <CurrencyMenuItem value="A$">A$ AUD</CurrencyMenuItem>
                <CurrencyMenuItem value="¥">¥ JPY</CurrencyMenuItem>
                <CurrencyMenuItem value="₽">₽ RUB</CurrencyMenuItem>
              </CurrencyMenu>
            )}
            <CurrencyIcon onClick={this.openCurrencySelect}>
              {this.state.currency} {this.state.isMenuOpen ? " 🢑" : " 🢓"}
            </CurrencyIcon>
          </MenuItem>
          <MenuItem
            style={{ position: "relative" }}
            onClick={this.toggleModal}
            id="card-overlay"
          >
            <img src="/cart.png" alt="cart" />
            <CartItemNumber>
              <CartNumber>{this.state.cart.length}</CartNumber>
            </CartItemNumber>
          </MenuItem>
        </NavMenu>
      </Nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrency: (currency) => {
      dispatch({ type: "change-currency", currency });
    },
    updateCost: (currency) => {
      dispatch({ type: "update-cost", currency });
    },
    cartUpdate: (data) => dispatch({ type: "cart-update", data }),
  };
};
export default connect(null, mapDispatchToProps)(Header);
