import bind from 'bind-decorator';

import { Component, isUndefined } from '../../helpers';
import Nav from '../nav';

class Header extends Component {
  _query = '.js-header';

  _className = 'header';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  toggleOpen(isOpened) {
    if (isUndefined(isOpened)) {
      this._isOpened = !this._isOpened;
    } else {
      this._isOpened = isOpened;
    }
    this._$element.toggleClass(`${this._className}_opened`, this._isOpened);
  }

  _init() {
    const { nav } = this._props;
    this._toggleNavigationButton = $(
      `${this._query}__toggle-navigation-button`,
      this._$element
    );
    this._nav = new Nav({
      parent: $(`${this._query}__nav`, this._$element),
      props: nav,
    });
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._toggleNavigationButton.on(
      'click',
      this._handleToggleNavigationButtonClick
    );
  }

  @bind
  _handleToggleNavigationButtonClick() {
    this.toggleOpen();
  }
}

export default Header;
