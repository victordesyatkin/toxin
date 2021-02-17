import get from 'lodash/get';
import bind from 'bind-decorator';

import { wordForm, Component } from '../../helpers/utils';
import Comment from '../comment';
import './comments.scss';

class Comments extends Component {
  static QUERY = 'comments';

  constructor(options = {}) {
    const { query, ...props } = options;
    super({
      query: query || Comments.QUERY,
      props,
    });
    this.init();
  }

  _init() {
    const units = get(this._props, ['units']) || [];
    const count = get(this._props, ['count']) || [];
    const $units = $(`${Comments.QUERY}__count-units`, this._$element);
    if (units.length) {
      $units.html(wordForm(count, units));
    }
    this._comments = get(this._props, ['comments']) || [];
    $(`${Comments.QUERY}__item`).each(this._renderItem);
  }

  @bind
  _renderItem(index, element) {
    const comment = this._comments[index];
    let item;
    if (comment) {
      item = new Comment({
        parent: element,
        props: comment,
      });
    }
    return item;
  }
}

export default Comments;
