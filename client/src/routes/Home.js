import { Component } from "react";
import Products from "../components/Products";
import {
  CategoryWrapper,
  CategoryName,
  CategoryMenu,
  CategoryMenuItem,
} from "../components/styles/CategoryName.styled";
import { connect } from "react-redux";
import { store } from "../state/store";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: store.getState().category,
      showCategoryMenu: false,
    };
  }

  handleCategory(e) {
    this.setState({ showCategoryMenu: true });
    const category = e.target.innerHTML;
    if (category === "all" || category === "tech" || category === "clothes") {
      this.props.changeCategory(category);
      this.setState({ showCategoryMenu: false });
    }
  }

  render() {
    return (
      <>
        <CategoryWrapper>
          <CategoryName value="all" onClick={(e) => this.handleCategory(e)}>
            {store.getState().category}
            <CategoryMenu show={this.state.showCategoryMenu}>
              <CategoryMenuItem>all</CategoryMenuItem>
              <CategoryMenuItem>tech</CategoryMenuItem>
              <CategoryMenuItem>clothes</CategoryMenuItem>
            </CategoryMenu>
          </CategoryName>
        </CategoryWrapper>
        <Products />;
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.categoryChange,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    changeCategory: (category) => {
      dispatch({ type: "change-category", category: category });
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Home);