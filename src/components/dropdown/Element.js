import bind from 'bind-decorator';

class Element {
  static TYPE_PLUS = 1;

  static TYPE_MINUS = 0;

  constructor(element) {
    this._$element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    this._$hiddenInput = $('input', this._$element);
    this._$buttonPlus = $(
      `button[data-type="${Element.TYPE_PLUS}"]`,
      this._$element
    ).on('click', Element.TYPE_PLUS, this._handleDecreaseOrIncreaseButtonClick);
    this._$buttonMinus = $(
      `button[data-type="${Element.TYPE_MINUS}"]`,
      this._$element
    ).on(
      'click',
      Element.TYPE_MINUS,
      this._handleDecreaseOrIncreaseButtonClick
    );
    this._$fakeInput = $('.js-dropdown__item-value', this._$element);
    if (typeof value !== 'undefined') {
      this._$fakeInput.html(value);
    }
  }

  @bind
  _handleDecreaseOrIncreaseButtonClick(event) {
    const type = event?.data;
    let value = parseInt(this._$hiddenInput.val(), 10);
    let flag = 0;
    if (type === Element.TYPE_MINUS && value > 0) {
      value--;
      flag = 1;
    } else if (type === Element.TYPE_PLUS) {
      value++;
      flag = 1;
    }
    if (flag) {
      if (value > 0) {
        this._$buttonMinus.removeClass('dropdown__button_fade');
      } else {
        this._$buttonMinus.addClass('dropdown__button_fade');
      }
      this._$fakeInput.text(value);
      this._$hiddenInput.val(value);
      const event = new Event('input');
      this._$hiddenInput[0].dispatchEvent(event);
    }
  }
}

export default Element;
