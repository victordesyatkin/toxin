import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';

class Control extends Component {
  _query = '.js-control';

  _className = 'control';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  hide() {
    this._$element?.addClass(`${this._className}_hidden`);
  }

  show() {
    this._$element?.removeClass(`${this._className}_hidden`);
  }

  _init() {
    this._$items = $(`${this._query}__button`, this._$element);
    this._$items.on('click', this._handleButtonClick);
  }

  @bind
  _handleButtonClick(event) {
    const currentTarget = event?.currentTarget;
    const type = $(currentTarget).data('type');
    if (type) {
      const { handleButtonClick } = this._props;
      if (handleButtonClick) {
        handleButtonClick(type);
      }
    }
  }
}

export default Control;
