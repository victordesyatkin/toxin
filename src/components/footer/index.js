import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import SubscriptionTextField from '../subscription-text-field';
import '../logo-link';
import '../list-links';
import '../copyright';
import './footer.scss';

class Footer {
  static CLASS_NAME = 'FOOTER';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-footer',
      render: render || Footer._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: Footer.CLASS_NAME,
      someClass: Footer,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    SubscriptionTextField.renderComponents({ parents: this._$element });
  }
}

export default Footer;
