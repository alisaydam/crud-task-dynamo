import styled from "styled-components";

export const TextArrtibute = styled.label`
  font-family: "Source Sans Pro";
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 160%;
  cursor: pointer;
  color: #1d1f22;
  border: 1px solid #1d1f22;
  padding: 0 5px;
`;

export const RadioInput = styled.input`
  display: none;
  &:checked + ${TextArrtibute} {
    background: #1d1f22;
    color: white;
  }
`;

export const DetailsTextArrtibute = styled.label`
  font-family: "Source Sans Pro";
  font-weight: 400;
  font-size: ${(props) => `${props.baseSize * 1.8}px`};
  cursor: pointer;
  background: ${(props) => (props.isMarked ? "#1d1f22" : "white")};
  color: ${(props) => (props.isMarked ? "white" : "#1d1f22")};
  border: 1px solid #1d1f22;
  padding: ${(props) => `${props.baseSize * 0.1}px ${props.baseSize}px `};
`;

export const DetailsRadioInput = styled.input`
  display: none;
`;

export const RadioInputDetails = styled.input`
  display: none;

  &:checked + ${TextArrtibute} {
    background: #1d1f22;
    color: white;
  }
`;

export const TextWrapper = styled.div`
  margin-right: 3px;
`;

export const ColorAttribute = styled.label`
  font-family: "Source Sans Pro";
  background: ${(props) => props.color};
  cursor: pointer;
  padding: 0 8px;
  outline-offset: -1 px;
  outline: 1px solid rgba(0, 0, 0, 0.1);
`;
export const ColorAttributeDetails = styled.label`
  outline-offset: ${(props) => (props.isMarked ? "2px" : "-1px")};
  outline: ${(props) =>
    props.isMarked ? "1px solid #5ece7b" : "1px solid rgba(0, 0, 0, 0.1)"};
  font-family: "Source Sans Pro";
  background: ${(props) => props.color};
  cursor: pointer;
  padding: 0 7px;
`;
export const RadioInputColor = styled.input`
  display: none;

  &:checked + ${ColorAttribute} {
    outline-offset: 2px;
    outline: 1px solid #5ece7b;
  }
`;

export const RadioInputColorDetails = styled.input`
  display: none;

  &:checked + ${ColorAttributeDetails} {
    outline-offset: 2px;
    outline: 1px solid #5ece7b;
  }
`;

export const AttributesWrap = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: ${(props) => `${props.baseSize * 6}px`};
  border: black 2px;
`;
export const AttributeNAme = styled.p`
  font-weight: 700;
  font-size: ${(props) => props.baseSize * 1.8 + "px"};
  text-transform: uppercase;
`;

export const DetailsAttributeRow = styled.div`
  display: flex;
`;
 
