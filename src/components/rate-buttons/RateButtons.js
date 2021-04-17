import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import RateButton from '../rate-button';

class RateButtons extends Component {
  _query = '.js-rate-buttons';

  _className = 'rate-buttons';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this._rateButtons = [];
    $(`${this._query}__item`, this._$element).each(this._renderRateButton);
  }

  @bind
  _renderRateButton(index, element) {
    const props = this._props?.buttons?.[index];
    this._rateButtons.push(
      new RateButton({ parent: $(element, this._$element), props })
    );
  }
}

export default RateButtons;
