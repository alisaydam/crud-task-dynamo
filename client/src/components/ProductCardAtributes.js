import { Component } from "react";
 import { nanoid } from "@reduxjs/toolkit";
 import {
   TextWrapper,
   RadioInput,
   TextArrtibute,
   ColorAttribute,
   RadioInputColor,
   AttributesWrap,
 } from "./styles/AttributeInput";


 
 class ProductAttributes extends Component {
   constructor(props) {
     super(props);
     this.state = {
       attributeGroup: nanoid(),
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
         {this.props.attribute.name}
         <AttributesWrap>
           {items.map((item, i) => {
             const uniqeInpuId = nanoid();
             if (type === "swatch") {
               return (
                 <TextWrapper>
                   <RadioInputColor
                     type="radio"
                     id={uniqeInpuId}
                     name={this.state.attributeGroup}
                   />
                   <ColorAttribute
                     value={item.value}
                     color={item.value}
                     onClick={this.selectAttributes}
                     htmlFor={uniqeInpuId}
                     title={item.displayValue}
                     name={name}
                   ></ColorAttribute>
                 </TextWrapper>
               );
             }
             return (
               <TextWrapper>
                 <RadioInput
                   type="radio"
                   checked={this.state.marked}
                   id={uniqeInpuId}
                   name={this.state.attributeGroup}
                 />
                 <TextArrtibute
                   name={name}
                   onClick={this.selectAttributes}
                   value={item.value}
                   htmlFor={uniqeInpuId}
                 >
                   {item.value}
                 </TextArrtibute>
               </TextWrapper>
             );
           })}
         </AttributesWrap>
       </>
     );
   }
 }

export default ProductAttributes;
