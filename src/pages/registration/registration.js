import { Component, requireAll } from '../../helpers/utils';
import SignUp from '../../components/sign-up';
import Base from '../base/base';
import data from './data.json';
import './index';

requireAll(require.context('./images/', false, /\.jpg$/));
class Registration extends Component {
  static handleComponentLoad() {
    console.log('handleComponentLoad');
    const registration = new Registration({ props: data });
    return registration;
  }

  _query = '.js-registration';

  _className = 'registration';

  constructor(options) {
    console.log('Registration constructor this._props : ', options);
    super(options);
    this._renderComponent();
  }

  _init() {
    const { signUp } = this._props;
    console.log('Registration this._props : ', this._props);
    this._base = new Base({
      props: this._props,
    });
    this._signUp = new SignUp({
      parent: $(`${this._query}__sign-up`, this._$element),
      props: signUp,
    });
  }
}

window.addEventListener('load', Registration.handleComponentLoad);

export default Registration;
