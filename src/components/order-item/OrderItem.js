import { Component, prepareNumber } from '../../helpers';

class OrderItem extends Component {
  _query = '.js-order-item';

  _className = 'order-item';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  update(data = {}) {
    this._props = { ...this._props, ...data };
    this._render();
  }

  getTotal() {
    const total = parseFloat(prepareNumber(this._$total.text()), 10);
    console.log('this._$total.text() ', prepareNumber(this._$total.text()));
    console.log('total : ', total);
    return total;
  }

  _init() {
    this._$content = $(`${this._query}__content`, this._$element);
    this._$total = $(`${this._query}__total`, this._$element);
  }

  _render() {
    const { content, total } = this._props;
    this._$content.html(content);
    this._$total.html(total);
  }
}

export default OrderItem;
