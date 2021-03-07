import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import NavItem from '../nav-item';
import '../button';
import './nav.scss';

class Nav extends Component {
  _query = '.js-nav';

  _className = 'nav';

  constructor(options) {
    // console.log('Nav constructor options : ', options);
    super(options);
    this._renderComponent();
  }

  _init() {
    // console.log('Nav : ', this._props);
    this._$navItems = $(`${this._query}__nav-section-item`, this._$element);
    this._navItems = [];
    this._$navItems.each(this._renderNavItem);
  }

  @bind
  _renderNavItem(index, element) {
    const item = this._props?.items?.[index] || {};
    // //console.log('_renderNavItem : ', this._navItems);
    this._navItems.push(
      new NavItem({
        parent: $(element, this._$element),
        props: item,
      })
    );
  }
}

export default Nav;
