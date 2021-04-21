import bind from 'bind-decorator';

import { Component } from '../../helpers';

class NavItem extends Component {
  _query = '.js-nav-item';

  _className = 'nav-item';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  open() {
    this._$element.addClass(`${this._className}_opened`);
    this._isOpened = true;
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
    this._isOpened = false;
  }

  _init() {
    const { isOpened } = this._props;
    this._isOpened = isOpened;
    this._$control = $(`${this._query}__control`, this._$element);
    this._$control.on('click', this._handleControlClick);
    this._$children = $(`${this._query}__children`, this._$element);
  }

  _toggleOpened() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  @bind
  _handleControlClick() {
    this._toggleOpened();
  }

  @bind
  _handleBodyClick(event) {
    const { target } = event;
    if (!$(target).closest(this._$element).length && this._isOpened) {
      this.close();
    }
  }

  @bind
  _handleChildrenFocusOut() {
    if (this._isOpened) {
      this.close();
    }
  }
}

export default NavItem;
