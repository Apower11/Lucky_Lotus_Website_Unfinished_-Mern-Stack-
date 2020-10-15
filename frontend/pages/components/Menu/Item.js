import React from "react";
import Button from "../../../shared/UIElements/Button";

const Item = (props) => {
  const addOrdersHandler = (order) => {
    props.addOrdersHandler(order);
    console.log(order);
  };
  return (
    <div className="item">
      <span className="price">£{props.price.toFixed(2)}</span>
      <span className="title">{props.title}</span>
      <span className="description">{props.description}</span>
      <Button
        onClick={() =>
          addOrdersHandler({
            title: props.title,
            price: props.price,
            id: props.id,
          })
        }
        type="submit"
      >
        Add
      </Button>
    </div>
  );
};

export default Item;
