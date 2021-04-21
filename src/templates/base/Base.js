import 'normalize.css';

import { Component } from '../../helpers';
import Header from '../../components/header';
import Footer from '../../components/footer';

class Base extends Component {
  _query = 'body';

  _className = '';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { footer, headerNotAuthorized } = this._props || {};
    this._headerNotAuthorized = new Header({
      parent: this._$element,
      props: headerNotAuthorized,
    });
    this._footer = new Footer({
      parent: this._$element,
      props: footer,
    });
  }
}

export default Base;
