import React from "react";
import Button from "../../../shared/UIElements/Button";
import Order from "./Order";

const Orders = (props) => {
  const onCloseHandler = (order) => {
    props.onCloseHandler(order);
  };
  console.log(props.orders);
  const orders = props.orders.map((order) => (
    <div className="order-preview" key={order.id}>
      <Order
        onCloseHandler={onCloseHandler}
        order={order}
      />
    </div>
  ));

  console.log(props.orders);

  console.log(orders);
  return (
    <div className="orders">
      <br />
      <br />
      <div className="pickup-method__choice">
        <input
          type="radio"
          id="collection"
          name="pickup-method"
          value="collection"
        />
        <label html-for="collection">Collection</label>
        <input
          type="radio"
          id="delivery"
          name="pickup-method"
          value="delivery"
        />
        <label html-for="delivery">Delivery</label>
      </div>
      <br />
      <br />
      <h1>Your Order</h1>
      <br />
      <hr />
      {orders}
      <br />
      <br />
      <hr />
      <div className="sub-total">
        <span className="sub-total__title bold">Subtotal:</span>
        <span className="sub-total__price">£{props.price.toFixed(2)}</span>
      </div>
      <div className="service-charge">
        <span className="service-charge__title">Service Charge:</span>
        <span className="service-charge__price">£0.50</span>
      </div>
      <div className="total">
        <span className="total__title bold">Total:</span>
        <span className="total__price">£{(props.price + 0.5).toFixed(2)}</span>
      </div>
      <div className="notes">
        <textarea
          rows="5"
          placeholder="e.g Instructions for your order"
        ></textarea>
      </div>
      <h3>Do you have any allergies?</h3>
      <div className="button-container">
        <Button>Order Now</Button>
      </div>
    </div>
  );
};

export default Orders;
