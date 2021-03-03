import bind from 'bind-decorator';
import get from 'lodash/get';

import { Component } from '../../helpers/utils';
import '../button';
import './control.scss';

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
    // console.log('this._$items : ', this._$items);
  }

  @bind
  _handleButtonClick(event) {
    // console.log('handleButtonClick : ', event);
    const currentTarget = get(event, ['currentTarget']);
    const type = $(currentTarget).data('type');
    // console.log('currentTarget : ', currentTarget);
    // console.log('type : ', $(currentTarget).data('type'));
    if (type) {
      const { handleButtonClick } = this._props;
      if (handleButtonClick) {
        handleButtonClick(type);
      }
    }
  }
}

export default Control;
