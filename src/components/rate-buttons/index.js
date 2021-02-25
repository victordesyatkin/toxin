import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import RateButton from '../rate-button';
import './rate-buttons.scss';

class RateButtons extends Component {
  _query = '.js-rate-buttons';

  _className = 'rate-buttons';

  constructor(options) {
    super(options);
    this._renderComponent();
    console.log('RateButtons : ', options);
  }

  _init() {
    this._rateButtons = [];
    $(`${this._query}__item`, this._$element).each(this._renderRateButton);
    console.log('RateButtons : ', $(`${this._query}__item`, this._$element));
  }

  @bind
  _renderRateButton(index, element) {
    const props = this._props?.buttons?.[index];
    this._rateButtons.push(
      new RateButton({ parent: $(element, this._$element), props })
    );
    console.log('this._rateButtons ; ', this._rateButtons);
  }
}

export default RateButtons;
