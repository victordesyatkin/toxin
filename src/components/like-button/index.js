import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import './like-button.scss';

class LikeButton {
  static CLASS_NAME = 'LIKE_BUTTON';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-like-button__button',
      render: render || LikeButton._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: LikeButton.CLASS_NAME,
      someClass: LikeButton,
    });
  }

  constructor(element) {
    this._element = element;
    this.input = this._element.querySelector('.js-like-button__input');
    this.count = this._element.querySelector('.js-like-button__count');
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this.input &&
      this.input.addEventListener &&
      this.input.addEventListener('click', this._handleInputClick);
  }

  _handleInputClick = () => {
    if (
      this.input &&
      this.input.checked !== undefined &&
      this.count &&
      this.count.innerHTML &&
      !isNaN(parseFloat(this.count.innerHTML))
    ) {
      if (this.input.checked) {
        this.count.innerHTML = parseFloat(this.count.innerHTML) + 1;
      } else {
        this.count.innerHTML =
          parseFloat(this.count.innerHTML) > 0
            ? parseFloat(this.count.innerHTML) - 1
            : this.count.innerHTML;
      }
    }
  };
}

export default LikeButton;
