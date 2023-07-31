import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./OrderItem.css";

class OrderItem extends Component {
  render() {
    let productData = this.props.product;
    {console.log(productData)}
    let data = (
      <div className="cartItem">
        <NavLink to={`/product/id/${productData._id}`}>
          
          <div className="cartImgCont">
            <img
              alt="productImg"
              src={`http://localhost:8080/${productData.imageUrl}`}
            />
          </div>

          <div className="cartItemProp">
            <h6 className="cartProdSeller">{productData.brand}</h6>
            <h5 className="cartProdName">{productData.name}</h5>
            <h5 className="cartProdPrice">Rs. {productData.price}</h5>
            <h6>Quantity : {productData.quantity}</h6>
          </div>
        </NavLink>
      </div>
    );

    return (
      <div>
        <h6>{data}</h6>
      </div>
    );
  }
}

export default OrderItem;
