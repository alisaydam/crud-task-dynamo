import styled from "styled-components";

export const TotalWrapper = styled.div`
  display: flex;
  width: 280px;
  height: 160px;
`;
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Item = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 500;
  display: flex;
  align-items: center;
  font-size: 24px;
`;
export const ItemBold = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: 700;
  font-size: 24px;
`;

export const OrderButton = styled.div`
  height: 43px;
  width: 280px;
  font-weight: 600;
  font-size: 14px;
  background: #5ece7b;
  color: white;
  display: grid;
  place-items: center;
  cursor: pointer;
`;