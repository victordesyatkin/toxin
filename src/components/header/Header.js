import bind from 'bind-decorator';

import { Component } from '../../helpers';
import Nav from '../nav';

class Header extends Component {
  _query = '.js-header';

  _className = 'header';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  open() {
    this._$element.addClass(`${this._className}_opened`);
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
  }

  _init() {
    const { nav } = this._props;
    this._toggleNavigationButton = $(
      `${this._query}__toggle-navigation-button`,
      this._$element
    );
    this._toggleNavigationButton.on(
      'click',
      this._handleToggleNavigationButtonClick
    );
    this._nav = new Nav({
      parent: $(`${this._query}__nav`, this._$element),
      props: nav,
    });
  }

  _toggleOpened() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  @bind
  _handleToggleNavigationButtonClick() {
    this._toggleOpened();
  }
}

export default Header;
