import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import './rate-button.scss';
class RateButton {
  static CLASS_NAME = 'RATE_BUTTON';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-rate-button__button',
      render: render || RateButton._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: RateButton.CLASS_NAME,
      someClass: RateButton,
    });
  }

  constructor(element) {
    this._element = element;
    this.count = this._element.dataset.count;
    this.input = this._element.querySelector('input');
    this._on = parseFloat($(this._element).data('on'));
    this._on && this._attachEventHandlers();
  }

  _attachEventHandlers() {
    if (this._element) {
      this._element.addEventListener(
        'click',
        this._handleInputClick.bind(this)
      );
    }
  }

  _handleInputClick = (event) => {
    let el = (event || {}).target;
    if (!el || !this.input) {
      return null;
    }
    if (el.tagName === 'IMG') {
      el = el.closest('div.js-rate-button__rate');
    }
    let { rate, index } = el.dataset || {};
    rate = parseFloat(rate);
    index = parseFloat(index);
    if (!rate) {
      this.input.value = index;
      for (let i = 1; i <= index; i++) {
        const prev = this._element.querySelector(`[data-index="${i}"]`);
        prev.dataset.rate = 1;
        const classList = prev.classList;
        if (
          Array.prototype.indexOf.call(
            classList,
            'js-rate-button__rate_checked'
          ) === -1
        ) {
          prev.classList.add('rate-button__rate_checked');
        }
      }
    } else if (rate && index) {
      this.input.value = index - 1;
      el.dataset.rate = 0;
      el.classList.remove('rate-button__rate_checked');
      for (let i = this.count; i >= index; i--) {
        const prev = this._element.querySelector(`[data-index="${i}"]`);
        prev.dataset.rate = 0;
        const classList = prev.classList;
        if (
          Array.prototype.indexOf.call(classList, 'rate-button__rate_checked') >
          -1
        ) {
          prev.classList.remove('rate-button__rate_checked');
        }
      }
    }
  };
}

export default RateButton;
