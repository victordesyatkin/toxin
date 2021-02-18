import { Component } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';

import './subscription-text-field.scss';

class SubscriptionTextField extends Component {
  _query = '.js-subscription-text-field';

  _init() {
    const { props } = this._props;
    this._maskedTextField = new MaskedTextField({
      parents: this._$element,
      props,
    });
  }
}

export default SubscriptionTextField;
