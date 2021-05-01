import { Component } from '../../helpers';
import SignUp from '../../components/sign-up';
import Base from '../../templates/base';

class Registration extends Component {
  _query = '.js-registration';

  _className = 'registration';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { signUp, backgroundImage } = this._props;
    this._base = new Base({
      props: this._props,
    });
    this._signUp = new SignUp({
      parent: $(`${this._query}__sign-up`, this._$element),
      props: signUp,
    });
    if (backgroundImage) {
      this._$element.css({ 'background-image': `url("${backgroundImage}")` });
    }
  }
}

export default Registration;
