import { Component } from '../../helpers/utils';
import Header from '../../components/header';
// import Footer from '../../components/footer';
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
    console.log('HeadersAndFooters constructor options : ', options);
    super(options);
    this._renderComponent();
  }

  _init() {
    const { headerNotAuthorized } = this._props;
    this._headerNotAuthorized = new Header({
      parent: $(`${this._query}__header-not-authorized`, this._$element),
      props: headerNotAuthorized,
    });
    console.log('this._init props : ', this._props);
    // Footer.renderComponents({ parents: this._$element });
  }
}

window.addEventListener('load', HeadersAndFooters.handleComponentLoad);

export default HeadersAndFooters;
