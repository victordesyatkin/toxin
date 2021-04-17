import { Component } from '../../helpers/utils';
import Book from '../../components/book';
import Comments from '../../components/comments';
import Rate from '../../components/rate';
import Slider from '../../components/slider';
import Base from '../../templates/base';

class RoomDetails extends Component {
  _query = '.js-room-details';

  _className = 'room-details';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { slider, rate, comments, book } = this._props;
    this._base = new Base({
      props: this._props,
    });
    this._slider = new Slider({
      parent: $(`${this._query}__slider`, this._$element),
      props: slider,
    });
    this._rate = new Rate({
      parent: $(`${this._query}__rate`, this._$element),
      props: rate,
    });
    this._comments = new Comments({
      parent: $(`${this._query}__comments-section`, this._$element),
      props: comments,
    });
    this._book = new Book({
      parent: $(`${this._query}__book`, this._$element),
      props: book,
    });
  }
}

export default RoomDetails;
