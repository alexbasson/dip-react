import React from 'react';
import './App.css';
import CustomerService from "./CustomerService";
import CustomerList from "./CustomerList";
import OrderService from "./OrderService";
import OrdersSearchAndOrdersList from "./OrdersSearchAndOrdersList";
import GetOrdersForCustomer from './GetOrdersForCustomer';

function App() {
  const customerService = new CustomerService();
  const orderService = new OrderService();
  const getOrdersForCustomer = new GetOrdersForCustomer(orderService);

  return (
      <div>
        <CustomerList customerService={customerService} />
        <OrdersSearchAndOrdersList getOrdersForCustomer={getOrdersForCustomer} />
      </div>
  );
}

export default App;
