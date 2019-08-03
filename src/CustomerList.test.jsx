import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomerList from "./CustomerList";

Enzyme.configure({adapter: new Adapter()});

class CustomerServiceStub {
  resolveGetCustomers = () => {
  };

  getCustomers() {
    return new Promise((resolve, reject) => {
      this.resolveGetCustomers = resolve;
    });
  }
}

describe('CustomerList', () => {
  let customerServiceStub;
  let wrapper;

  beforeEach(() => {
    customerServiceStub = new CustomerServiceStub();

    wrapper = shallow(<CustomerList customerService={customerServiceStub}/>);
  });

  describe('when the customer service returns with customers', () => {
    beforeEach(() => {
      customerServiceStub.resolveGetCustomers([
        {
          id: '1',
          firstName: 'first-1',
          lastName: 'last-1'
        },
        {
          id: '2',
          firstName: 'first-2',
          lastName: 'last-2'
        }
      ]);
    });

    it('renders the list of customers', () => {
      const customerRows = wrapper.find('[data-customer]');

      expect(customerRows.length).toBe(2);

      expect(customerRows.at(0).text()).toContain('first-1 last-1');
      expect(customerRows.at(1).text()).toContain('first-2 last-2');
    });
  });
});
