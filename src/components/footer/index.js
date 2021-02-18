import { Component } from '../../helpers/utils';
import SubscriptionTextField from '../subscription-text-field';
import '../logo-link';
import '../list-links';
import '../copyright';
import './footer.scss';

class Footer extends Component {
  _query = '.js-footer';

  _init() {
    const { filed } = this._props;
    this._subscriptionTextField = new SubscriptionTextField({
      parents: this._$element,
      props: filed,
    });
  }
}

export default Footer;
