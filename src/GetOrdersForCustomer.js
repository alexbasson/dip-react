export default class GetOrdersForCustomer {
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
