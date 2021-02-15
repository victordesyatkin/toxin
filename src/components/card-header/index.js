import get from 'lodash/get';

import { renderComponents } from '../../assets/helpers/utils';

import './card-header.scss';

export default class CardHeader {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-card-header',
      render: render || CardHeader._renderComponent,
    });
  }

  static _renderComponent() {
    new CardHeader(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this.init();
  }

  init() {
    const data = this._$element.data();
    const numberFormat = get(data, ['numberformat']);
    const options = get(data, ['options']);
    $('.js-card-header__price-content', this._$element).each(
      this.parserPriceContent.bind(this, numberFormat, options)
    );
  }

  parserPriceContent(numberFormat, options, index, element) {
    $(element).html(
      new Intl.NumberFormat(numberFormat, options).format(
        parseFloat($(element).html().replace(' ', ''))
      )
    );
  }
}
