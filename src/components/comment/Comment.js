import { Component } from '../../helpers';
import LikeButton from '../like-button';

class Comment extends Component {
  _query = '.js-comment';

  _className = 'comment';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { likeButton } = this._props;
    this._likeButton = new LikeButton({
      parent: $(`${this._query}__like-button`, this._$element),
      props: likeButton,
    });
  }
}

export default Comment;
