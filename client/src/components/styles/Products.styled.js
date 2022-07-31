import styled, { css } from "styled-components";

export const ProductGrid = styled.div`
  max-width: 1140px;
  margin: auto;
  display: grid;
  grid-gap: 100px 40px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  place-items: center;
`;

export const ProductCardWrapper = styled.div`
  position: relative;
  padding: 16px;
  max-width: 350px;
  &:hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const ProductName = styled.h2`
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  font-style: normal;
  cursor: pointer;
`;

export const ProductPrice = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 160%;
`;

export const AddToCardIcon = styled.div`
  position: absolute;
  background-color: #5ece7b;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  right: 20px;
  bottom: 8px;
  cursor: pointer;
`;
export const OutOfStockModal = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

export const OutOfStock = styled.p`
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(128, 128, 128, 0.9);
  width: 100%;
  font-size: 40px;
  font-weight: 700;
  margin-top: 25%;
  height: 50px;
  text-align: center;
`;

export const Toast = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  z-index: 2;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  color: #90ee90;
  font-size: 25px;
  font-weight: 700;
  padding: 10px;
`;
