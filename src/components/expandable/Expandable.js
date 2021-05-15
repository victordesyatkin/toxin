import bind from 'bind-decorator';

import { Component, checkerOutsideClick, isUndefined } from '../../helpers';

class Expandable extends Component {
  _query = '.js-expandable';

  _className = 'expandable';

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
    this._$header = $(`${this._query}__header`, this._$element);
    this._bindEventListeners();
  }

  _bindEventListeners() {
    this._$header.on({ click: this._handleHeaderClick });
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleHeaderClick() {
    this.toggleOpen();
  }

  @bind
  _handleBodyClick(event) {
    const isClickedOutside = checkerOutsideClick({
      event,
      isOpened: this._isOpened,
      callback: () => this.toggleOpen(false),
      $parent: this._$element,
    });
    if (isClickedOutside) {
      this.toggleOpen(false);
    }
  }
}

export default Expandable;
