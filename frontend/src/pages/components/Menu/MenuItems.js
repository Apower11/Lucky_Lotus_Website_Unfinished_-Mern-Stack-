import React, { useState } from "react";
import Item from "./Item";

const MenuItems = (props) => {
  const [showTab1, setShowTab1] = useState(true);
  const [showTab2, setShowTab2] = useState(false);
  const [showTab3, setShowTab3] = useState(false);
  const [showTab4, setShowTab4] = useState(false);

  const addOrdersHandler = (order) => {
    props.onChange(order);
    console.log(order);
  };

  

  const item = <Item addOrdersHandler={addOrdersHandler} />;

  const items = [
    {
      id: "1",
      title: "Dim Sum",
      price: 13.0,
      description: "pretty nice",
    },
    {
      id: "2",
      title: "Dim Sum 2",
      price: 11.0,
      description: "pretty nice",
    },
    {
      id: "3",
      title: "Dim Sum 3",
      price: 10.0,
      description: "pretty nice",
    },
    {
      id: "4",
      title: "Dim Sum 4",
      price: 12.0,
      description: "pretty nice",
    },
    {
      id: "5",
      title: "Dim Sum 5",
      price: 13.0,
      description: "pretty nice",
    },
    {
      id: "6",
      title: "Dim Sum 6",
      price: 13.0,
      description: "pretty nice",
    },
    {
      id: "7",
      title: "Dim Sum 7",
      price: 13.0,
      description: "pretty nice",
    },
    {
      id: "8",
      title: "Dim Sum 8",
      price: 13.0,
      description: "pretty nice",
    },
  ];

  const itemsComponent1 = items
    .slice(0, 4)
    .map((item) => (
      <Item
        title={item.title}
        price={item.price}
        description={item.description}
        id={item.id}
        addOrdersHandler={addOrdersHandler}
      />
    ));
  const itemsComponent2 = items
    .slice(4, 8)
    .map((item) => (
      <Item
        title={item.title}
        price={item.price}
        description={item.description}
        id={item.id}
        addOrdersHandler={addOrdersHandler}
      />
    ));

  const tab1 = (
    <div className="tab-content">
      <div className="left-side">{itemsComponent1}</div>
      <div className="right-side">{itemsComponent2}</div>
    </div>
  );

  const tab2 = (
    <div className="tab-content">
      <div className="left-side">
        {item}
        {item}
        {item}
        {item}
      </div>
      <div className="right-side">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );

  const tab3 = (
    <div className="tab-content">
      <div className="left-side">
        {item}
        {item}
        {item}
        {item}
      </div>
      <div className="right-side">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );

  const tab4 = (
    <div className="tab-content">
      <div className="left-side">
        {item}
        {item}
        {item}
        {item}
      </div>
      <div className="right-side">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="menu-items">
        <div className="tab">
          <h3
            className={showTab1 && "active"}
            onClick={() => {
              setShowTab1(true);
              setShowTab2(false);
              setShowTab3(false);
              setShowTab4(false);
            }}
          >
            Starters
          </h3>
          <h3
            className={showTab2 && "active"}
            onClick={() => {
              setShowTab1(false);
              setShowTab2(true);
              setShowTab3(false);
              setShowTab4(false);
            }}
          >
            Section 2
          </h3>
          <h3
            className={showTab3 && "active"}
            onClick={() => {
              setShowTab1(false);
              setShowTab2(false);
              setShowTab3(true);
              setShowTab4(false);
            }}
          >
            Section 3
          </h3>
          <h3
            className={showTab4 && "active"}
            onClick={() => {
              setShowTab1(false);
              setShowTab2(false);
              setShowTab3(false);
              setShowTab4(true);
            }}
          >
            Section 4
          </h3>
        </div>
        <div className="items">
          {showTab1
            ? tab1
            : showTab2
            ? tab2
            : showTab3
            ? tab3
            : showTab4
            ? tab4
            : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MenuItems;
