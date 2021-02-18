import { Component } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';
import Input from '../input';
import '../button';
import '../card-footer';
import './sign-in.scss';

class SignIn extends Component {
  _query = '.js-sign-in';

  _init() {
    const { email, password } = this._props;
    this._maskedTextField = new MaskedTextField({
      parent: $(`${this._query}__email`, this._$element),
      props: email,
    });
    this._password = new Input({
      parent: $(`${this._query}__password`, this._$element),
      props: password,
    });
  }
}

export default SignIn;
