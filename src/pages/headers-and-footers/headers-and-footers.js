import { Component } from '../../helpers/utils';
import Header from '../../components/header';
import Footer from '../../components/footer';
import '../demo-base/demo-base';
import './headers-and-footers.scss';
import data from './data.json';

class HeadersAndFooters extends Component {
  static handleComponentLoad() {
    const headersAndFooters = new HeadersAndFooters({ props: data });
    return headersAndFooters;
  }

  _query = '.js-headers-and-footers';

  _className = 'headers-and-footers';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const {
      headerNotAuthorized,
      headerAuthorized,
      footer1,
      footer2,
    } = this._props;
    this._headerNotAuthorized = new Header({
      parent: $(`${this._query}__header-not-authorized`, this._$element),
      props: headerNotAuthorized,
    });
    this._headerAuthorized = new Header({
      parent: $(`${this._query}__header-authorized`, this._$element),
      props: headerAuthorized,
    });
    this._footer1 = new Footer({
      parent: $(`${this._query}__footer-first`, this._$element),
      props: footer1,
    });
    this._footer2 = new Footer({
      parent: $(`${this._query}__footer-second`, this._$element),
      props: footer2,
    });
  }
}

window.addEventListener('load', HeadersAndFooters.handleComponentLoad);

export default HeadersAndFooters;
