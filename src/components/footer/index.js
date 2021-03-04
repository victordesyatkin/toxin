import { Component } from '../../helpers/utils';
import SubscriptionTextField from '../subscription-text-field';
import '../logo-link';
import '../list-links';
import '../copyright';
import './footer.scss';

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
    console.log('subscriptionTextField : ', subscriptionTextField);
    this._subscriptionTextField = new SubscriptionTextField({
      parents: $(`${this._query}__subscription-text-field`, this._$element),
      props: subscriptionTextField,
    });
  }
}

export default Footer;
