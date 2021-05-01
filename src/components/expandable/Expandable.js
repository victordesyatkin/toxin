import bind from 'bind-decorator';

import { Component } from '../../helpers';

class Expandable extends Component {
  _query = '.js-expandable';

  _className = 'expandable';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  toggleOpen() {
    if (this._isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this._isOpened = true;
    this._$element.toggleClass(`${this._className}_opened`);
    this._$body.toggle(this._isOpened);
  }

  close() {
    this._isOpened = false;
    this._$element.toggleClass(`${this._className}_opened`);
    this._$body.toggle(this._isOpened);
  }

  _init() {
    const { isOpened } = this._props;
    this._isOpened = isOpened;
    this._$header = $(`${this._query}__header`, this._$element);
    this._$header.on({ click: this._handleHeaderClick });
    this._$body = $(`${this._query}__body`, this._$element);
    this._$body.toggle(this._isOpened);
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleHeaderClick() {
    this.toggleOpen();
  }

  @bind
  _handleBodyClick(event) {
    if (this._isOpened) {
      const { target } = event;
      if (!$(target).closest(this._$element).length) {
        this.close();
      }
    }
  }
}

export default Expandable;
