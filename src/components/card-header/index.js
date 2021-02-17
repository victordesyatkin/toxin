import get from 'lodash/get';
import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './card-header.scss';

class CardHeader extends Component {
  _query = '.js-card-header';

  init() {
    this._numberFormat = get(this._props, ['numberFormat']);
    this._options = get(this._props, ['options']);
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
