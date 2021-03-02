import get from 'lodash/get';
import bind from 'bind-decorator';

import { wordForm, Component } from '../../helpers/utils';
import Comment from '../comment';
import './comments.scss';

class Comments extends Component {
  _query = 'js-comments';

  _className = 'comments';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const units = get(this._props, ['units']);
    const count = get(this._props, ['count']);
    const $units = $(`${this._query}__count-units`, this._$element);
    if (units.length) {
      $units.html(wordForm(count, units));
    }
    this._comments = [];
    $(`${this._query}__item`).each(this._renderItem);
  }

  @bind
  _renderItem(index, element) {
    const props = this._props?.comments?.[index];
    this._comments.push(
      new Comment({
        parent: element,
        props,
      })
    );
  }
}

export default Comments;
