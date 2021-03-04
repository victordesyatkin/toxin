import bind from 'bind-decorator';

import { wordForm, Component } from '../../helpers/utils';
import Dropdown from '../dropdown';
import DateDropdown from '../date-dropdown';
import '../card';
import '../button';
import './book.scss';

class Book extends Component {
  static TYPE_PRICE = 3;

  static TYPE_COUNT = 1;

  static TYPE_FEE = 2;

  static IS_CALENDAR = 1;

  static _prepareNumber(number = '') {
    return number.split(' ').join('') || 0;
  }

  _query = '.js-book';

  _className = 'book';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { dateDropdown, dropdown } = this._props;
    this._$basisContent = $(`${this._query}__basis-content`, this._$element);
    this._$basisTotal = $(`${this._query}__basis-total`, this._$element);
    this._$discountContent = $(
      `${this._query}__discount-content`,
      this._$element
    );
    this._$total = $(`${this._query}__total`, this._$element);
    this._basisTotal = 0;
    console.log('this._$discountContent : ', this._$discountContent);
    this._$discountTotal = $(`${this._query}__discount-total`, this._$element);
    this._dateDropdown = new DateDropdown({
      parent: $(`${this._query}__date-dropdown`),
      props: {
        ...dateDropdown,
        handleCalendarClick: this._handleCalendarClick,
        handleApplyButtonClick: this._handleCalendarClick,
      },
    });
    this._dropdown = new Dropdown({
      parent: $(`${this._query}__dropdown`),
      props: dropdown,
    });
  }

  _updateTotal() {
    const { unit, additionalServiceFeeTotal } = this._props;
    const parseAdditionalServiceFeeTotal =
      parseFloat(additionalServiceFeeTotal, 10) || 0;
    let total =
      this._basisTotal - this._discountTotal + parseAdditionalServiceFeeTotal;
    if (total < 0) {
      total = 0;
    }
    this._$total.html(`${this._prepareFormat(total)}${unit}`);
  }

  _updateDiscount() {
    const { discountContent = '', discountTotal = '', unit } = this._props;
    let parseDiscountTotal =
      parseFloat(Book._prepareNumber(discountTotal), 10) || 0;
    this._discountTotal = parseDiscountTotal;
    if (parseDiscountTotal) {
      parseDiscountTotal = `${this._prepareFormat(parseDiscountTotal)}${unit}`;
      this._$discountContent.html(discountContent);
      this._$discountTotal.html(parseDiscountTotal);
    } else {
      this._$discountContent.html('');
      this._$discountTotal.html('');
    }
  }

  _prepareFormat(number = 0) {
    const { options, numberFormat } = this._props;
    return new Intl.NumberFormat(numberFormat, options).format(number);
  }

  _prepareBasis(duration = 0) {
    const { price, unit, words } = this._props;
    let parsePrice = parseFloat(Book._prepareNumber(price), 10) || 0;
    let total = Math.round(parsePrice * duration);
    this._basisTotal = total;
    total = this._prepareFormat(total);
    total = `${total}${unit}`;
    parsePrice = `${this._prepareFormat(parsePrice)}${unit}`;
    this._$basisContent.html(
      `${parsePrice} x ${duration} ${wordForm(duration, words)}`
    );
    this._$basisTotal.html(total);
  }

  @bind
  _handleCalendarClick(dates = []) {
    const [start, end] = dates;
    let duration = 0;
    if (start && end) {
      duration = Math.round(
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
      );
    }
    console.log('duration : ', duration);
    this._prepareBasis(duration);
    this._updateDiscount();
    this._updateTotal();
  }
}

export default Book;
