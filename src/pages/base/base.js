import 'normalize.css';

import { Component } from '../../helpers/utils';
// import Footer from '../../components/footer';
import '../../components/layout';
import '../../components/header';
import '../../theme/global.scss';
import './base.scss';

class Base extends Component {
  _query = 'body';

  _init() {
    // Footer.renderComponents({ parents: this._$element });
  }
}

export default Base;
