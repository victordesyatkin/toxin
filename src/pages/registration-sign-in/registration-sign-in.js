import { Component } from '../../helpers/utils';
import SignIn from '../../components/sign-in';
import Base from '../base/base';
import '../registration/index';
import data from './data.json';
import './registration-sign-in.scss';

class RegistrationSignIn extends Component {
  static handleComponentLoad() {
    const registration = new RegistrationSignIn({ props: data });
    return registration;
  }

  _query = '.js-registration';

  _className = 'registration';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { signIn } = this._props;
    this._base = new Base({
      props: this._props,
    });
    this._signIn = new SignIn({
      parent: $(`${this._query}__sign-in`, this._$element),
      props: signIn,
    });
  }
}

window.addEventListener('load', RegistrationSignIn.handleComponentLoad);

export default RegistrationSignIn;
