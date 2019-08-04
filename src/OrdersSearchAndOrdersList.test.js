import React from 'react';
import OrdersSearchAndOrdersList from './OrdersSearchAndOrdersList';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GetOrdersForCustomer from './GetOrdersForCustomer';

Enzyme.configure({adapter: new Adapter()});

class OrderServiceSpy {
  getOrdersForCustomerWasCalledWithFirstName = '';
  resolveGetOrdersForCustomer = () => {};
  rejectGetOrdersForCustomer = () => {};

  getOrdersForCustomer(firstName) {
    this.getOrdersForCustomerWasCalledWithFirstName = firstName;
    return new Promise((resolve, reject) => {
      this.resolveGetOrdersForCustomer = resolve;
      this.rejectGetOrdersForCustomer = reject;
    });
  }
}

describe('OrdersSearchAndOrdersList', () => {
  let wrapper;
  let orderServiceSpy;

  beforeEach(() => {
    orderServiceSpy = new OrderServiceSpy();
    const getOrdersForCustomer = new GetOrdersForCustomer(orderServiceSpy)
    wrapper = shallow(<OrdersSearchAndOrdersList getOrdersForCustomer={getOrdersForCustomer}/>);
  });

  describe('when the user submits a name to the form', () => {
    beforeEach(() => {
      const input = wrapper.find('input[name="query"]');
      input.simulate('change', {target: {value: 'first-name'}});

      const button = wrapper.find('form');
      button.simulate('submit', {preventDefault: () => {}});
    });

    it('calls the orderService to getOrdersForCustomer with the query string', () => {
      expect(orderServiceSpy.getOrdersForCustomerWasCalledWithFirstName).toEqual('first-name');
    });

    describe('when the response returns', () => {
      describe('with a non-empty list of orders', () => {
        beforeEach(() => {
          orderServiceSpy.resolveGetOrdersForCustomer([
            {
              id: '1',
              date: '2018-03-04',
              totalAmount: '12345'
            },
            {
              id: '2',
              date: '2018-04-05',
              totalAmount: '54321'
            }
          ]);
        });

        it('displays the orders', () => {
          const orderRows = wrapper.find('[data-order-row]');
          expect(orderRows.length).toBe(2);

          expect(orderRows.at(0).text()).toContain('2018-03-04');
          expect(orderRows.at(0).text()).toContain('$12345');

          expect(orderRows.at(1).text()).toContain('2018-04-05');
          expect(orderRows.at(1).text()).toContain('$54321');
        });
      });

      describe('with an empty list of orders', () => {
        beforeEach(() => {
          orderServiceSpy.resolveGetOrdersForCustomer([]);
        });

        it('displays a "no orders" message', () => {
          const noOrdersMessage = wrapper.find('[data-no-orders-message]');
          expect(noOrdersMessage.text()).toContain('first-name');
        });
      });

      describe('with an error', () => {
        beforeEach(() => {
          orderServiceSpy.rejectGetOrdersForCustomer('some error message');
        });

        it('displays an error message', () => {
          const noCustomersMessage = wrapper.find('[data-no-customer-message]');
          expect(noCustomersMessage.text()).toContain('first-name');
        });
      });
    });
  });
});
