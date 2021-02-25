import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './rate-button.scss';

class RateButton extends Component {
  _query = '.js-rate-button';

  _className = 'rate-button';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { isDisabled, value = 0 } = this._props;
    if (!isDisabled) {
      this._rate = value;
      this._$rates = $(`${this._query}__rate`, this._$element);
      this._$input = $(`${this._query}__input`, this._$element);
      this._$rates.on('click', this._handleLiClick);
    }
  }

  @bind
  _handleLiClick(event) {
    const { currentTarget } = event;
    const $element = $(currentTarget, this._$element);
    const isChecked = parseFloat($element.data('ischecked'), 10);
    let corrector = 0;
    if (isChecked) {
      corrector = 1;
    }
    this._rate = parseFloat($element.data('rate'), 10) - corrector;
    this._$input.val(this._rate);
    this._$rates.each(this._prepareRate);
  }

  @bind
  _prepareRate(index, element) {
    console.log('_prepareRate : ', index, element);
    if (index + 1 <= this._rate) {
      $(element, this._$element)
        .addClass(`${this._className}__rate_checked`)
        .data({ ischecked: 1 });
    } else {
      $(element, this._$element)
        .removeClass(`${this._className}__rate_checked`)
        .data({ ischecked: 0 });
    }
  }
}

export default RateButton;
