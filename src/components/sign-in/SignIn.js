import { Component } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';
import TextField from '../text-field';
import '../button';
import '../card';
import '../card-footer';
import './sign-in.scss';

class SignIn extends Component {
  _query = '.js-sign-in';

  _className = 'sign-in';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { email, password } = this._props;
    this._maskedTextField = new MaskedTextField({
      parent: $(`${this._query}__email`, this._$element),
      props: email,
    });

    this._password = new TextField({
      parent: $(`${this._query}__password`, this._$element),
      props: password,
    });
  }
}

export default SignIn;
