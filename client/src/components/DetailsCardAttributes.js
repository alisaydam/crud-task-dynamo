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
    let [nameOfAtt, value] = this.props.selectedAttribute;
    if (!value) value = this.props.attribute.items[0].value;

    return (
      <>
        <AttributesWrap baseSize={this.props.baseSize}>
          <div>
            <AttributeNAme baseSize={this.props.baseSize}>
              {nameOfAtt || this.props.attribute.name} {":"}
            </AttributeNAme>
            <DetailsAttributeRow>
              {items.map((item, i) => {
                let selected = false;
                const uniqeInpuId = nanoid();
                if (value === item.value) {
                  selected = true;
                }
                if (type === "swatch") {
                  return (
                    <TextWrapper>
                      <RadioInputColorDetails
                        type="radio"
                        id={uniqeInpuId}
                        name={this.state.attributeGroup}
                      />
                      <ColorAttributeDetails
                        baseSize={this.props.baseSize}
                        isMarked={selected}
                        value={item.value}
                        color={item.value}
                        onClick={this.selectAttributes}
                        htmlFor={uniqeInpuId}
                        title={item.displayValue}
                        name={name}
                      ></ColorAttributeDetails>
                    </TextWrapper>
                  );
                }
                return (
                  <TextWrapper>
                    <DetailsRadioInput
                      type="radio"
                      id={uniqeInpuId}
                      name={this.state.attributeGroup}
                      details={true}
                    />
                    <DetailsTextArrtibute
                      baseSize={this.props.baseSize}
                      isMarked={selected}
                      name={name}
                      onClick={this.selectAttributes}
                      value={item.value}
                      htmlFor={uniqeInpuId}
                    >
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
