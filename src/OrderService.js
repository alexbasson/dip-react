export default class OrderService {

  getOrdersForCustomer(firstName) {
    return fetch("fixtures/orders.json")
      .then(response => response.json())
      .then((data) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(data);
          }, 1000);
        });
      })
      .then(data => {
        if (!data.hasOwnProperty(firstName.toLowerCase())) {
          throw new Error(`no customer with first name ${firstName}`);
        }
        return data[firstName.toLowerCase()];
      })
  }

}
