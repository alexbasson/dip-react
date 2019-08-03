import React from 'react';

export default class CustomerList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    this.props.customerService.getCustomers()
      .then((customers) => {
        this.setState({customers});
      });
  }

  render() {
    const {customers} = this.state;
    return (
      <div>
        <h3>Customers</h3>
        <ul>
          {
            customers.map((customer) => {
              return <li data-customer key={customer.id}>{customer.firstName} {customer.lastName}</li>;
            })
          }
        </ul>
      </div>
    )
  }
}
