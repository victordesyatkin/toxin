import { Component } from '../../helpers';
import SignIn from '../../components/sign-in';
import Base from '../../templates/base';

class RegistrationSignIn extends Component {
  _query = '.js-registration';

  _className = 'registration';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { signIn, backgroundImage } = this._props;
    this._base = new Base({
      props: this._props,
    });
    this._signIn = new SignIn({
      parent: $(`${this._query}__sign-in`, this._$element),
      props: signIn,
    });
    if (backgroundImage) {
      this._$element.css({
        'background-image': `url("${backgroundImage}")`,
      });
    }
  }
}

export default RegistrationSignIn;
