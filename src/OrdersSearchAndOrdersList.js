import React from 'react';

export default class OrdersSearchAndOrdersList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      orders: [],
      error: '',
      loadingState: 'unloaded',
      body: <div></div>
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);

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
    const query = event.target.value;
    this.setState({
      query,
      error: '',
      loadingState: 'unloaded'
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {query} = this.state;

    this.loading();
    this.props.orderService.getOrdersForCustomer(query)
      .then((orders) => {
        if (orders.length > 0) {
          this.receivedOrders(orders);
        } else {
          this.noOrdersFound(query);
        }
      })
      .catch((error) => {
        this.noCustomerFound(query);
      });
  }

  handleResponse() {
    const {orders, error, query, loadingState} = this.state;

    if (loadingState === 'loading') {
      this.loading();
    } else if (error !== '') {
      this.noCustomerFound(query);
    } else if (orders.length > 0) {
      this.receivedOrders(orders);
    } else if (loadingState === 'loaded') {
      this.noOrdersFound(query);
    }
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
