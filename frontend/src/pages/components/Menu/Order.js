import React from "react";

const Order = (props) => {
  const onCloseHandler = (order) => {
    props.onCloseHandler(props.order);
    console.log(props.order);
  };
  return (
    <div className="order">
      <span className="cross" onClick={onCloseHandler}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </span>
      <span className="order-item">{props.order.title}</span>
      <span className="order-item_price">£{props.order.price.toFixed(2)}</span>
    </div>
  );
};

export default Order;
