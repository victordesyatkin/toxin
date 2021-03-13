import { Component, requireAll } from '../../helpers/utils';
import LikeButton from '../like-button';
import './comment.scss';

requireAll(require.context('./images/', false, /\.png$/));

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
