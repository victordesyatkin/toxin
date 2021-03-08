import 'normalize.css';
import isEmpty from 'lodash/isEmpty';

import { Component, requireAll } from '../../helpers/utils';
import Header from '../../components/header';
import Footer from '../../components/footer';
import '../../components/layout';
import '../../theme/global.scss';
import data from './data.json';
import './base.scss';

requireAll(
  require.context(
    '../../assets/favicon/',
    false,
    /\.(png|jpg|jpeg|gif|ico|svg|json|webmanifest)$/
  )
);

class Base extends Component {
  _query = 'body';

  _className = '';

  constructor(options) {
    // console.log('Base constructor this._props : ', options);
    super(options);
    this._renderComponent();
  }

  _init() {
    const { footer, headerNotAuthorized } = isEmpty(this._props)
      ? data
      : this._props;
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
