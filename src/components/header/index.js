import { Component } from '../../helpers/utils';
import Nav from '../nav';
import '../logo-link';
import './header.scss';

class Header extends Component {
  _query = '.js-header';

  _className = 'header';

  constructor(options) {
    // console.log('Header constructor options : ', options);
    super(options);
    this._renderComponent();
  }

  _init() {
    const { nav } = this._props;
    // console.log(
    //   '$(`${this._query}__nav`, this._$element) : ',
    //   $(`${this._query}__nav`, this._$element)
    // );
    this._nav = new Nav({
      parent: $(`${this._query}__nav`, this._$element),
      props: nav,
    });
  }
}

export default Header;
