import { Component } from '../../helpers/utils';
import LikeButton from '../like-button';
import './comment.scss';

class Comment extends Component {
  static QUERY = '.js-comment';

  constructor(options = {}) {
    const { query, ...props } = options;
    super({
      query: query || Comment.QUERY,
      props,
    });
    this.init();
  }

  _init() {
    const { likeButton } = this._props;
    this._likeButton = new LikeButton({
      parents: $(`${Comment.QUERY}__like-button`, this._$element),
      props: likeButton,
    });
  }
}

export default Comment;
