import React from 'react';
import './App.css';
import CustomerService from "./CustomerService";
import CustomerList from "./CustomerList";
import OrderService from "./OrderService";
import OrdersSearchAndOrdersList from "./OrdersSearchAndOrdersList";

function App() {
  const customerService = new CustomerService();
  const orderService = new OrderService();

  return (
      <div>
        <CustomerList customerService={customerService} />
        <OrdersSearchAndOrdersList orderService={orderService} />
      </div>
  );
}

export default App;
