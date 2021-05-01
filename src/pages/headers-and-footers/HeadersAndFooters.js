import { Component } from '../../helpers';
import Header from '../../components/header';
import Footer from '../../components/footer';

class HeadersAndFooters extends Component {
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
      parent: $(`${this._query}__footer`, this._$element),
      props: footer1,
    });
    this._footer2 = new Footer({
      parent: $(`${this._query}__footer-small`, this._$element),
      props: footer2,
    });
  }
}

export default HeadersAndFooters;
