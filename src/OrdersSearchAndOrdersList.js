import React from 'react';

class GetOrdersForCustomer {
  constructor(orderService) {
    this.orderService = orderService;
  }

  execute(query, outcomeHandler) {
    outcomeHandler.loading();
    this.orderService.getOrdersForCustomer(query)
      .then((orders) => {
        if (orders.length > 0) {
          outcomeHandler.receivedOrders(orders);
        } else {
          outcomeHandler.noOrdersFound(query);
        }
      })
      .catch((error) => {
        outcomeHandler.noCustomerFound(query);
      });
  }
}

export default class OrdersSearchAndOrdersList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      body: <div></div>
    };

    this.getOrdersForCustomer = new GetOrdersForCustomer(this.props.orderService);

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.receivedOrders = this.receivedOrders.bind(this);
    this.noOrdersFound = this.noOrdersFound.bind(this);
    this.noCustomerFound = this.noCustomerFound.bind(this);
    this.loading = this.loading.bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="query">Enter a customer's first name: </label>
          <input name="query" value={this.state.query} onChange={this.handleQueryChange}/>
          <button type="submit">Get Orders</button>
        </form>

        {this.state.body}
      </div>
    )
  }

  handleQueryChange(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {query} = this.state;
    this.getOrdersForCustomer.execute(query, this);
  }

  receivedOrders(orders) {
    this.setState({
      body: (
        <table cellPadding="0" cellSpacing="0">
          <thead>
          <tr>
            <th className="align-left">Order date</th>
            <th className="align-right">Total amount</th>
          </tr>
          </thead>

          <tbody>
          {
            orders.map((order) => {
              return <tr key={order.id} data-order-row>
                <td>{order.date}</td>
                <td className="align-right">${order.totalAmount}</td>
              </tr>
            })
          }
          </tbody>
        </table>
      )
    });
  }

  noCustomerFound(query) {
    this.setState({body: <h3 data-no-customer-message>Error: No customer with name '{query}'</h3>});
  }

  noOrdersFound(query) {
    this.setState({body: <h3 data-no-orders-message>No orders found for customer with name '{query}'</h3>});
  }

  loading() {
    this.setState({body: <div>Loading...</div>});
  }
}
