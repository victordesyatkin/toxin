import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import MaskedTextField from '../masked-text-field';
import Input from '../input';
import '../button';
import '../card-footer';
import './sign-in.scss';

class SignIn {
  static CLASS_NAME = 'SIGN_IN';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-sign-in',
      render: render || SignIn._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: SignIn.CLASS_NAME,
      someClass: SignIn,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    const parents = this._$element;
    MaskedTextField.renderComponents({ parents });
    Input.renderComponents({ parents });
  }
}

export default SignIn;
