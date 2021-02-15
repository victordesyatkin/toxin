import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import LikeButton from '../like-button';
import './comment.scss';

class Comment {
  static CLASS_NAME = 'COMMENT';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-comment',
      render: render || Comment._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: Comment.CLASS_NAME,
      someClass: Comment,
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

export default Comment;
