import { Component } from '../../helpers';
import SubscriptionTextField from '../subscription-text-field';

class Footer extends Component {
  _query = '.js-footer';

  _className = 'footer';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { subscribe = {} } = this._props;
    const { subscriptionTextField } = subscribe;
    this._subscriptionTextField = new SubscriptionTextField({
      parents: $(`${this._query}__subscription-text-field`, this._$element),
      props: subscriptionTextField,
    });
  }
}

export default Footer;
