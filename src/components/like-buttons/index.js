import { Component } from '../../helpers/utils';
import LikeButton from '../like-button';
import './like-buttons.scss';

class LikeButtons extends Component {
  _query = '.js-like-buttons';

  _init() {
    const { buttons = [] } = this._props;
    this._buttons = buttons;
    $(`${this._query}__item`, this._$element).each(this._renderButton);
  }

  _renderButton(index, element) {
    const props = this._buttons[index];
    return new LikeButton({ parents: element, props });
  }
}

export default LikeButtons;
