import {
  transformNumber,
  wordForm,
  prepareNumber,
  Component,
} from '../../helpers';
import OrderItem from '../order-item';

class OrderItemBasis extends Component {
  _query = '.js-order-item-basis';

  _className = 'order-item-basis';

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
    this._render();
  }

  _render() {
    const {
      duration = 0,
      price = 0,
      unit = '',
      numberFormat = {},
      durationUnits = [],
    } = this._props;
    const readyPrice = `${transformNumber({
      number: parseFloat(prepareNumber(price), 10),
      numberFormat,
    })}${unit}`;
    const readyDurationUnit = wordForm(duration, durationUnits);
    const content = `${readyPrice} x ${duration} ${readyDurationUnit}`;
    const total = `${transformNumber({
      number: this._calculate(duration),
      numberFormat,
    })}${unit}`;
    this._orderItem.update({ content, total });
  }

  _calculate(duration) {
    const { price } = this._props;
    return duration * parseFloat(prepareNumber(price), 10);
  }
}

export default OrderItemBasis;
