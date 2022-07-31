import styled from "styled-components";

export const DetailsWrapCartPage = styled.div`
  max-width: 1140px;
  margin: auto;
  height: 100%;
`;

export const CartDetailsLimiter = styled.div`
  height: 330px;
  width: 100%;
`;
export const DetailsCard = styled.div`
  padding: ${(props) => props.baseSize + "px 0px"};
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
`;

export const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  font-size: ${(props) => props.baseSize + "px"};
`;

export const ProductBrand = styled.p`
  font-weight: 600;
  font-size: 3em;
`;

export const ProductName = styled.p`
  font-weight: 400;
  font-size: 3.2em;
`;
export const ProductPrice = styled.p`
  font-weight: 700;
  font-size: 2.4em;
  margin-bottom: 2em;
`;

export const GallerySection = styled.div`
  display: flex;
  flex-directon: column;
  justify-content: space-between;
  height: 100%;
  width: ${(props) => `${props.baseSize * 45}px`};
`;
export const CountWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.col};
  margin-right: ${(props) => props.baseSize * 2 + "px"};
  font-size: 5px;
`;

export const ProductCountUpdate = styled.div`
  width: ${(props) => `${props.baseSize * 4.5}px`};
  height: ${(props) => `${props.baseSize * 4.5}px`};
  border: 1px solid black;
  display: grid;
  place-items: center;
  font-size: ${(props) => `${props.baseSize * 4.5}px`};
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
`;

export const ProductCount = styled.p`
  font-weight: 500;
  font-size: ${(props) => `${props.baseSize * 2.4}px`}; ;
`;

export const ImageWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ArrowsWrap = styled.div`
  position: absolute;
  height: 24px;
  width: 56px;
  bottom: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
