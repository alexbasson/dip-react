import React from 'react';

export default class OrdersSearchAndOrdersList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      orders: [],
      error: '',
      loadingState: 'unloaded'
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const {orders, error, query, loadingState} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="query">Enter a customer's first name: </label>
          <input name="query" value={this.state.query} onChange={this.handleQueryChange}/>
          <button type="submit">Get Orders</button>
        </form>

        {
          loadingState === 'loading'
            ?
            <div>Loading...</div>
            :
            error !== ''
              ?
              <h3>Error: No customer with name '{query}'</h3>
              :
              orders.length > 0
                ?
                (
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
                        return <tr key={order.id}>
                          <td>{order.date}</td>
                          <td className="align-right">${order.totalAmount}</td>
                        </tr>
                      })
                    }
                    </tbody>
                  </table>
                )
                :
                loadingState === 'loaded'
                  ?
                  <h3>No orders found for customer with name '{query}'</h3>
                  :
                  <div/>
        }

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
    this.setState({
      loadingState: 'loading'
    });
    const {query} = this.state;
    this.props.orderService.getOrdersForCustomer(query)
      .then((orders) => {
        this.setState({
          orders,
          loadingState: 'loaded'
        });
      })
      .catch((error) => {
        this.setState({
          error,
          loadingState: 'loaded'
        });
      });
  }

}
