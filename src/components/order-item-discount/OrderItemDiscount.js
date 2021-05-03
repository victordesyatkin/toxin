import { Component, prepareNumber, transformNumber } from '../../helpers';
import OrderItem from '../order-item/OrderItem';

class OrderItemDiscount extends Component {
  _query = '.js-order-item-discount';

  _className = 'order-item-discount';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  update(data = {}) {
    this._props = { ...this._props, ...data };
    this._render();
  }

  getTotal() {
    return this._orderItem.getTotal();
  }

  getDiscount() {
    return parseFloat(prepareNumber(this._discount), 10);
  }

  _init() {
    const { discount } = this._props;
    this._discount = discount || 0;
    this._orderItem = new OrderItem({
      parent: this._$element,
      props: this._props,
    });
    this._render();
  }

  _render() {
    const { unit, numberFormat, content } = this._props;
    const readyDiscount = `${transformNumber({
      number: this._calculate(),
      numberFormat,
    })}${unit}`;
    const readyContent = `${content} ${readyDiscount}`;
    this._orderItem.update({ content: readyContent });
  }

  _calculate() {
    return this.getDiscount();
  }
}

export default OrderItemDiscount;
