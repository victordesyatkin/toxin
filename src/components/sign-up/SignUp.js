import { Component } from '../../helpers';
import MaskedTextField from '../masked-text-field';
import TextField from '../text-field';

class SignUp extends Component {
  _query = '.js-sign-up';

  _className = 'sign-up';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { birthday, email, password } = this._props;
    this._birthday = new MaskedTextField({
      parent: $(`${this._query}__birthday`, this._$element),
      props: birthday,
    });
    this._email = new MaskedTextField({
      parent: $(`${this._query}__email`, this._$element),
      props: email,
    });
    this._password = new TextField({
      parent: $(`${this._query}__password`, this._$element),
      props: password,
    });
  }
}

export default SignUp;
