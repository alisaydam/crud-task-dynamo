import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
  max-width: 1140px;
  margin: auto;
`;

export const NavMenu = styled.ul`
  padding: 0;
  display: flex;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
`;

export const MenuItem = styled.li`
  padding: 0 16px;
  height: 80px;
  display: flex;
  align-items: center;
  font-weight: ${(props) => props.selected && 600};
  font-size: 16px;
  line-height: 120%;
  list-style: none;
  color: ${(props) => props.selected && "#5ECE7B"};
  border-bottom: ${(props) => (props.selected ? "#5ECE7B solid 2px" : "")};
  cursor: pointer;
  &:hover {
    color: #5ece7b;
  }
`;

export const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 80px;
  background: rgba(0, 0, 0, 0.2);
  z-index: 15;
`;

export const CardOverlay = styled.div`
  position: absolute;
  max-height: 500px;
  right: 0;
  background: white;
  padding: 16px 30px 16px 16px;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 250;
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
    -ms-overflow-style: none;
    scrollbar-width: none; /* Firefox */
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const CurrencyMenu = styled.ul`
  position: absolute;
  top: 80px;
  right: 55px;
  padding: 10px 0;
  z-index: 10;
  background: white;
  width: 114px;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
`;

export const CurrencyMenuItem = styled.option`
  font-weight: 500;
  font-size: 18px;
  padding: 10px;
  list-style: none;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
`;

export const CurrencyIcon = styled.p`
  font-weight: 500;
  font-size: 18px;
`;

export const CartItemNumber = styled.div`
  position: absolute;
  height: 15px;
  width: 15px;
  display: flex;
  top: 25px;
  right: 7px;
  align-items: center;
  justify-content: center;
  z-index: 500;
  border-radius: 50%;
  z-index: 50;
  background: black;
`;
export const CartNumber = styled.p`
  color: white;
  font-size: 10px;
  font-weight: 600;
`;

export const OverlayLimiter = styled.div`
  height: 220px;
`;
export const OverLayPositioner = styled.div`
  max-width: 1140px;
  height: 100%;
  margin: auto;
  position: relative;
`;
export const CountWrapper = styled.div`
  display: flex;
  padding: 16px 0;
`;
export const BoldTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
`;

export const Count = styled.p`
  font-weight: 500;
  font-size: 16px;
`;

export const TotalWraper = styled.div`
  display: flex;
  padding: 16px 0;
  justify-content: space-between;
`;

export const CheckoutButton = styled.div`
  height: 43px;
  width: 170px;
  background: ${(props) => props.color};
  font-weight: 600;
  font-size: 14px;
  display: grid;
  background: #5ece7b;
  place-items: center;
  cursor: pointer;
  color: white;
`;
export const ViewBag = styled.div`
  height: 43px;
  width: 170px;
  background: ${(props) => props.color};
  font-weight: 600;
  font-size: 14px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  cursor: pointer;
  color: #1d1f22;
`;
