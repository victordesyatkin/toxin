import { Component } from '../../helpers';

class Icon extends Component {
  _className = 'icon';

  _query = `.js-${this._className}`;

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this._$icon = $('span', this._$element);
  }

  updateIcon(className) {
    this.removeIcon();
    this.addIcon(className);
  }

  addIcon(className) {
    this._$icon.addClass(className);
  }

  removeIcon() {
    this._$icon.removeClass();
  }
}

export default Icon;
