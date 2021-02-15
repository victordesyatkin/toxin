import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import MaskedTextField from '../masked-text-field';

import './subscription-text-field.scss';
class SubscriptionTextField {
  static CLASS_NAME = 'SUBSCRIPTION_TEXT_FIELD';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-subscription-text-field',
      render: render || SubscriptionTextField._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: SubscriptionTextField.CLASS_NAME,
      someClass: SubscriptionTextField,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    MaskedTextField.renderComponents({ parents: this._$element });
  }
}

export default SubscriptionTextField;
