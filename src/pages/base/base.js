import 'normalize.css';

import { Component } from '../../helpers/utils';
import Footer from '../../components/footer';
import '../../components/layout';
import '../../components/header';
import '../../theme/global.scss';
import './base.scss';
import data from './data.json';

class Base extends Component {
  _query = 'body';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { footer } = data || {};
    this._footer = new Footer({
      parent: this._$element,
      props: footer,
    });
  }
}

export default Base;
