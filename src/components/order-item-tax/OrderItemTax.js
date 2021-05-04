import { Component } from '../../helpers';
import OrderItem from '../order-item';

class OrderItemTax extends Component {
  _query = '.js-order-item-tax';

  _className = 'order-item-tax';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  update(data = {}) {
    this._props = { ...this._props, ...data };
    this._render();
  }

  getDiscount() {
    return this._discount || 0;
  }

  getTotal() {
    return this._orderItem.getTotal();
  }

  _init() {
    this._orderItem = new OrderItem({
      parent: this._$element,
      props: this._props,
    });
  }

  _render() {
    this._orderItem.update(this._props);
  }
}

export default OrderItemTax;
