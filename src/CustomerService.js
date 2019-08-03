export default class CustomerService {

  getCustomers() {
    return fetch("fixtures/customers.json")
      .then(response => response.json())
  }
}
