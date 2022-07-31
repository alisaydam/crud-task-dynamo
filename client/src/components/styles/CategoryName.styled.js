import styled from "styled-components";

export const CategoryWrapper = styled.div`
  max-width: 1140px;
  margin: auto;
`;
export const CategoryName = styled.div`
  font-weight: 400;
  font-size: 42px;
  line-height: 160%;
  margin: 60px 0;
  cursor: pointer;
  width: 20%;
  position: relative;
`;

export const CategoryMenu = styled.ul`
  position: absolute;
  left: 0;
  padding: 0;
  display: ${(props) => (props.show ? "block" : "none")};
  z-index: 12;
`;
export const CategoryMenuItem = styled.li`
  font-size: 36px;
  list-style: none;
  line-height: 110%;
  display: flex;
  &:hover {
    color: #5ece7b;
  }
`;