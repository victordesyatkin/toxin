import bind from 'bind-decorator';

import { Component } from '../../helpers';

class CardHeader extends Component {
  _query = '.js-card-header';

  init() {
    const { numberFormat, options } = this._props;
    this._numberFormat = numberFormat;
    this._options = options;
    $(`${this._query}__price-content`, this._$element).each(
      this.parserPriceContent
    );
  }

  @bind
  parserPriceContent(index, element) {
    const html = new Intl.NumberFormat(
      this._numberFormat,
      this._options
    ).format(parseFloat($(element).html().replace(' ', '')));
    $(element).html(html);
  }
}

export default CardHeader;
