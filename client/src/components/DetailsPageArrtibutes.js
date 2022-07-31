import { Component } from "react";
import { nanoid } from "@reduxjs/toolkit";
import {
  TextWrapper,
  ColorAttributeDetails,
  RadioInputColorDetails,
  AttributesWrap,
  DetailsAttributeRow,
  DetailsTextArrtibute,
  DetailsRadioInput,
  AttributeNAme,
} from "./styles/AttributeInput";

class DetailsCardAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributeGroup: nanoid(),
      marked: false,
    };
  }

  selectAttributes = (e) => {
    const name = e.currentTarget.getAttribute("name");
    const value = e.currentTarget.getAttribute("value");
    this.props.getValues({ name, value });
  };

  render() {
    const { type, items, name } = this.props.attribute;

    return (
      <>
        <AttributesWrap baseSize={this.props.baseSize}>
          <div>
            <AttributeNAme baseSize={this.props.baseSize}></AttributeNAme>
            <DetailsAttributeRow>
              {items.map((item, i) => {
                let selected = false;
                const uniqeInpuId = nanoid();
                if (type === "swatch") {
                  return (
                    <TextWrapper>
                      <RadioInputColorDetails type="radio" id={uniqeInpuId} />
                      <ColorAttributeDetails
                        baseSize={this.props.baseSize}
                        onClick={this.selectAttributes}
                        htmlFor={uniqeInpuId}
                        name={name}
                      ></ColorAttributeDetails>
                    </TextWrapper>
                  );
                }
                return (
                  <TextWrapper>
                    <DetailsRadioInput type="radio" id={uniqeInpuId} />
                    <DetailsTextArrtibute htmlFor={uniqeInpuId}>
                      {item.value}
                    </DetailsTextArrtibute>
                  </TextWrapper>
                );
              })}
            </DetailsAttributeRow>
          </div>
        </AttributesWrap>
      </>
    );
  }
}

export default DetailsCardAttributes;
