import { Component, transformNumber, prepareNumber } from '../../helpers';

class CardHeader extends Component {
  _className = 'card-header';

  _query = `.js-${this._className}`;

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  update(price) {
    if (this._$priceContent) {
      const { numberFormat, options } = this._props;
      const readyPrice = transformNumber({
        number: prepareNumber(price),
        numberFormat: { locales: numberFormat, options },
      });
      this._$priceContent.html(readyPrice);
    }
  }

  _init() {
    const { price } = this._props;
    this._$priceContent = $(`${this._query}__price-content`, this._$element);
    this.update(price);
  }
}

export default CardHeader;
