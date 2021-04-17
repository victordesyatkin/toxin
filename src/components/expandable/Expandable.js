import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';

class Expandable extends Component {
  _query = '.js-expandable';

  _className = 'expandable';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  open() {
    this._isOpened = true;
    this._$element.addClass(`${this._className}_opened`);
  }

  close() {
    this._isOpened = false;
    this._$element.removeClass(`${this._className}_opened`);
  }

  _init() {
    const { isOpened } = this._props;
    this._isOpened = isOpened;
    this._$header = $(`${this._query}__header`, this._$element);
    this._$header.on('click', this._toggleClass);
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _toggleClass() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
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
