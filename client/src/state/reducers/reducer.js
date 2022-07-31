export const categoryReducer = (state = "all", action) => {
  if (action.type === "change-category") {
    state = action.category;
    return state;
  }
  return state;
};

// const initialState = {
//   cart: JSON.parse(localStorage.getItem("cart")) || [],
//   totalCost: JSON.parse(localStorage.getItem("total")) || 0,
// };

const cart = [];

export const cartReducer = (state = cart, action) => {
  if (action.type === "cart-update") {
    state = action.data;
  }
  return state;
};
export const selectedCurrency = (
  state = localStorage.getItem("preferredCurrency") || "$",
  action
) => {
  if (action.type === "change-currency") {
    localStorage.setItem("preferredCurrency", action.currency);
    state = action.currency;
  }
  return state;
};
