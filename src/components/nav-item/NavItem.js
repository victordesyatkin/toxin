import bind from 'bind-decorator';

import { Component, checkerOutsideClick, isUndefined } from '../../helpers';

class NavItem extends Component {
  _query = '.js-nav-item';

  _className = 'nav-item';

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
    const { isOpened } = this._props;
    this._isOpened = isOpened;
    this._$control = $(`${this._query}__control`, this._$element);
    this._$children = $(`${this._query}__children`, this._$element);
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._$control.on('click', this._handleControlClick);
  }

  @bind
  _handleControlClick() {
    this.toggleOpen();
  }

  @bind
  _handleBodyClick(event) {
    const isClickedOutside = checkerOutsideClick({
      event,
      isOpened: this._isOpened,
      $parent: this._$element,
    });
    if (isClickedOutside) {
      this.toggleOpen(false);
    }
  }

  @bind
  _handleChildrenFocusOut() {
    if (this._isOpened) {
      this.toggleOpen(false);
    }
  }
}

export default NavItem;
