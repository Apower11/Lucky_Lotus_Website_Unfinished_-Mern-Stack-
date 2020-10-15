import React, { useEffect, useState } from "react";
import Reservation from "./components/shared/Reservation";
import Orders from "./components/Menu/Orders";
import MenuItems from "./components/Menu/MenuItems";
import Title from "../shared/UIElements/Title";
import Breadcrumbs from "../shared/UIElements/Breadcrumbs";
import "./css/Menu.css";

const Menu = (props) => {
  const [orders, setOrders] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addOrdersHandler = (order) => {
    setPrice(price + order.price);
    order.id = orders.length + 1;
    setOrders((orders) => [...orders, order]);
    console.log(price);
  };

  const closeOrdersHandler = (Order) => {
    setPrice(price - Order.price);
    console.log(Order.id);
    setOrders(orders.filter((order) => order.id !== Order.id));
  };

  let ordersArray = orders;

  return (
    <React.Fragment>
      <Title title="Lucky Lotus - Our Menu"></Title>
      <div className="navbar-placeholder"></div>
      <Breadcrumbs>Our Menu</Breadcrumbs>
      <div className="menu">
        <MenuItems onChange={addOrdersHandler} />
        <Orders
          price={price}
          onCloseHandler={closeOrdersHandler}
          orders={ordersArray}
        />
      </div>
      <Reservation />
    </React.Fragment>
  );
};

export default Menu;
