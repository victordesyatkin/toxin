import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import LikeButton from '../like-button';
import './like-buttons.scss';

class LikeButtons extends Component {
  _query = '.js-like-buttons';

  _className = 'like-buttons';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this._buttons = [];
    this._$items = $(`${this._query}__item`, this._$element).each(
      this._renderItems
    );
  }

  @bind
  _renderItems(index, element) {
    const props = this._props?.buttons?.[index];
    this._buttons.push(new LikeButton({ parent: element, props }));
  }
}

export default LikeButtons;
