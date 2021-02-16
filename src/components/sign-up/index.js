import { renderComponents, renderComponent } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';
import Input from '../input';
import '../radio-buttons';
import '../toggle-button';
import '../button';
import '../card-footer';
import './sign-up.scss';

class SignUp {
  static CLASS_NAME = 'SIGN_UP';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-sign-up',
      render: render || SignUp._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: SignUp.CLASS_NAME,
      someClass: SignUp,
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

export default SignUp;
