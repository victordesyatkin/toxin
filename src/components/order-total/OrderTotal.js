import { Component, transformNumber } from '../../helpers';

class OrderTotal extends Component {
  _query = '.js-order-total';

  _className = 'order-total';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  update(data = {}) {
    this._props = { ...this._props, ...data };
    this._render();
  }

  _init() {
    this._$content = $(`${this._query}__content`, this._$element);
    this._$total = $(`${this._query}__total`, this._$element);
    this._render();
  }

  _render() {
    const { content } = this._props;
    this._$content.html(content);
    this._$total.html(this._calculate());
  }

  _calculate() {
    const { total, items, unit, numberFormat } = this._props;
    if (items?.length) {
      let amount = 0;
      items?.forEach((item) => {
        amount += item?.getTotal ? item.getTotal() : 0;
        const discount = item?.getDiscount ? item?.getDiscount() : 0;
        if (discount) {
          amount -= discount;
        }
      });
      amount = amount >= 0 ? amount : 0;
      return `${transformNumber({ number: amount, numberFormat })}${unit}`;
    }
    return total;
  }
}

export default OrderTotal;
