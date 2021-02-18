import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import RateButton from '../rate-button';
import './rate-buttons.scss';

class RateButtons extends Component {
  _query = '.js-rate-buttons';

  _init() {
    const { buttons } = this._props;
    this._rateButtons = buttons;
    $(`${this._query}__item`, this._$element).each(this._renderRateButton);
  }

  @bind
  _renderRateButton(index, element) {
    const props = this._rateButton[index];
    return new RateButton({ parents: $(element, this._$element), props });
  }
}

export default RateButtons;
