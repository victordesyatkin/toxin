import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import LikeButton from '../like-button';
import './like-buttons.scss';

class LikeButtons {
  static CLASS_NAME = 'LIKE_BUTTONS';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-like-buttons',
      render: render || LikeButtons._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: LikeButtons.CLASS_NAME,
      someClass: LikeButtons,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    LikeButton.renderComponents({ parents: this._$element });
  }
}

export default LikeButtons;
