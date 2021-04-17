import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';

class LikeButton extends Component {
  _query = '.js-like-button';

  _className = 'like-button';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { isDisabled } = this._props;
    if (!isDisabled) {
      this._$input = $(`${this._query}__input`, this._$element);
      this._$count = $(`${this._query}__count`, this._$element);
      this._$input.on('click', this._handleInputClick);
    }
  }

  @bind
  _handleInputClick() {
    let count = parseFloat(this._$count.html(), 10) || 0;
    const isChecked = this._$input.prop('checked');
    if (isChecked) {
      count += 1;
      this._$count.html(count);
    } else if (count > 0) {
      count -= 1;
      this._$count.html(count);
    }
    this._$input.val(count);
  }
}

export default LikeButton;
