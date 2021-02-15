import datepicker from 'air-datepicker';
import get from 'lodash/get';
import bind from 'bind-decorator';

import {
  wordForm,
  renderComponents,
  renderComponent,
} from '../../helpers/utils';
import Dropdown from '../dropdown';
import DateDropdown from '../date-dropdown';
import '../button';

import './book.scss';

class Book {
  static TYPE_PRICE = 3;

  static TYPE_COUNT = 1;

  static TYPE_FEE = 2;

  static IS_CALENDAR = 1;

  static CLASS_NAME = 'BOOK';

  static renderComponents(options = {}) {
    const { parents, query, render } = options;
    renderComponents({
      parents,
      query: query || '.js-book',
      render: render || Book._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: Book.CLASS_NAME,
      someClass: Book,
    });
  }

  static prepareNumber(n = '') {
    return n.split(' ').join('') || 0;
  }

  constructor(component) {
    this._component = component;
    this._$component = $(component);
    this._init();
  }

  _init() {
    Dropdown.renderComponents({ parents: this._$component });
    DateDropdown.renderComponents({ parents: this._$component });
    this._$calc = $(
      `.js-book__section[data-type="${Book.TYPE_COUNT}"]`,
      this._$component
    );
    this._$calcInfo = $('.js-book__section-info', this._$calc);
    this._$calcTotal = $('.js-book__section-total', this._$calc);
    this._$total = $(
      `.js-book__section[data-type="${Book.TYPE_FEE}"]`,
      this._$component
    );
    this._$totalTotal = $('.js-book__section-total', this._$total);
    this._props = this._$component.data('options');
    this._price = parseFloat(Book.prepareNumber(this._props.price));
    this._discount = parseFloat(Book.prepareNumber(this._props.discount));
    this._unit = this._props.unit;
    this._$calendar = $('.js-calendar', this._$component);
    this._$input = $(
      `.js-book__date-dropdown input[type="hidden"][date-isCalendar="${Book.IS_CALENDAR}"]`,
      this._$component
    );
    this._words = get(this._props, ['words'], []);
    this._numberFormat = get(this._props, ['numberFormat']);
    this._options = get(this._props, ['options']);
    this._dirty = 0;
    this._datepicker = this._$input.datepicker().data('datepicker');
    this._prepareDirty();
    this._setCalc();
    this._$calendar.on('click', this._setCalc);
  }

  _setTotal(tempTotal = 0) {
    let total = tempTotal;
    total += this._dirty - this._discount;
    if (total < 0) {
      total = 0;
    }
    total = new Intl.NumberFormat(this._numberFormat, this._options).format(
      total
    );
    this._$totalTotal.html(`${total}<span>${this._unit}</span>`);
  }

  _prepareDirty() {
    const $dates = $('.js-book__section:not([data-type])');
    $('.js-book__section-total', $dates).each(this._prepareDirtyItem);
  }

  @bind
  _prepareDirtyItem(index, element) {
    this._dirty += parseFloat(Book.prepareNumber($(element).html()));
  }

  @bind
  _setCalc() {
    let price = this._price;
    const selectedDates = this._datepicker.selectedDates || [];
    const [start, end] = selectedDates;
    let count = (end - start) / (1000 * 60 * 60 * 24);
    if (!count) {
      count = 0;
    }
    let total = price * count;
    this._setTotal(total);
    price = new Intl.NumberFormat(this._numberFormat, this._options).format(
      price
    );
    total = new Intl.NumberFormat(this._numberFormat, this._options).format(
      total
    );
    this._$calcInfo.html(
      `${price}${this._unit} x ${count} ${wordForm(count, this._words)}`
    );
    this._$calcTotal.html(`${total}${this._unit}`);
  }
}

export default Book;
