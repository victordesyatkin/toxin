import { Component } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';

import './subscription-text-field.scss';

class SubscriptionTextField extends Component {
  _query = '.js-subscription-text-field';

  _className = 'subscription-text-field';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this._maskedTextField = new MaskedTextField({
      parent: this._$element,
      props: this._props,
    });
  }
}

export default SubscriptionTextField;
