import bind from 'bind-decorator';
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';

import { Component } from '../../helpers/utils';
import MaskedTextField from '../masked-text-field';
import Calendar from '../calendar';
import './date-dropdown.scss';
import DropdownTitleControl from '../dropdown-title-text-field';

class DateDropdown extends Component {
  static TYPE_CLEAN = 0;

  static TYPE_APPLY = 1;

  static IS_CALENDAR = 1;

  static TYPES = ['start', 'end'];

  static _prepareDate(passDate) {
    let date = new Date(passDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    date = `${day}.${month}.${date.getFullYear()}`;
    return date;
  }

  static _isValidDate({ partDay, partMonth, partYear }) {
    return partDay && partMonth && partYear;
  }

  static _value2Date(value) {
    const parts = value.split('.');
    const partDay = parseFloat(parts[0]);
    const partMonth = parseFloat(parts[1]);
    const partYear = parseFloat(parts[2]);
    let date = '';
    if (DateDropdown._isValidDate({ partDay, partMonth, partYear })) {
      date = `${partMonth}.${partDay}.${partYear}`;
    }
    if (date) {
      date = new Date(date);
      if (!(date instanceof Date)) {
        date = '';
      }
    }
    return date;
  }

  static isClosest({ event, $element, targetClass }) {
    return (
      $(event.target).closest($element).length &&
      $(event.target, $element).hasClass('datepicker--cell') &&
      $(targetClass, $element).length
    );
  }

  static _checkType(type = '') {
    return DateDropdown.TYPES.indexOf(type) > -1;
  }

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _query = '.js-date-dropdown';

  _className = 'date-dropdown';

  _init() {
    const { calendar, isOpened } = this._props;
    this._items = [];
    this._isOpened = isOpened;
    this._$items = $(`${this._query}__item`, this._$element);
    this._$items.each(this._renderItem);
    this._calendar = new Calendar({
      parent: $(`${this._query}__calendar`),
      props: {
        ...calendar,
        handleCleanButtonClick: this._handleCleanButtonClick,
        handleApplyButtonClick: this._handleApplyButtonClick,
        handleCalendarClick: this._handleCalendarClick,
      },
    });

    // console.log('this._$items : ', this._$items);
    // const { fieldStart, fieldEnd, calendar } = this._props;
    // this._maskedTextFieldStart = new MaskedTextField({
    //   parents: $(`js-${this._query}__masked-text-field-start`, this._$element),
    //   props: fieldStart,
    // });
    // this._maskedTextFieldEnd = new MaskedTextField({
    //   parents: $(`js-${this._query}__masked-text-field-end`, this._$element),
    //   props: fieldEnd,
    // });
    // this._calendar = new Calendar({
    //   parents: $(`js-${this._query}__calendar`, this._$element),
    //   props: calendar,
    // });
    // this._$sections = $('.js-input__section', this._$element);
    // this._inputStart = $('.js-input__input', this._$sections.get(0));
    // this._inputStart.attr('disabled', true);
    // this._inputEnd = $('.js-input__input', this._$sections.get(1));
    // this._inputEnd.attr('disabled', true);
    // this._$sections.on('click', this._handleInputClick);
    // this._$calendar = $('.js-date-dropdown__section-calendar', this._$element);
    // this._datepicker = $(
    //   `input[type="hidden"][date-isCalendar="${DateDropdown.IS_CALENDAR}"]`,
    //   this._$calendar
    // )
    //   .datepicker()
    //   .data('datepicker');
    // this._setDates({
    //   start: this._value2Date(this._getValue('start')),
    //   end: this._value2Date(this._getValue('end')),
    // });
    // this._buttonClean = $(
    //   `button[data-type="${DateDropdown.TYPE_CLEAN}"]`,
    //   this._$calendar
    // );
    // this._buttonApply = $(
    //   `button[data-type="${DateDropdown.TYPE_APPLY}"]`,
    //   this._$calendar
    // );
    // this._buttonClean.on('click', this._handleCleanButtonClick);
    // this._buttonApply.on('click', this._handleApplyButtonClick);
    // $(document).on('click', this._handleDocumentClick);
  }

  open() {
    this._$element.addClass(`${this._className}_opened`);
    this._items.forEach((item) => item.open());
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
    this._items.forEach((item) => item.close());
  }

  clean() {
    this._items.forEach((item) => item.cleanValue());
  }

  @bind
  _renderItem(index, element) {
    const props = get(this._props, ['items', [index]]);
    this._items.push(
      new DropdownTitleControl({
        parent: element,
        props: {
          ...props,
          // eslint-disable-next-line prettier/prettier
          handleDropdownTitleTextFieldClick: this._toggleOpen,
        },
      })
    );
  }

  // @bind
  // _handleDropdownTitleTextFieldClick() {

  // }

  @bind
  _handleCleanButtonClick() {
    return this.clean();
  }

  @bind
  _toggleOpen() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  @bind
  _handleInputClick() {
    if (this._$calendar.is(':visible')) {
      this._$calendar.slideUp('fast', this._setZIndex.bind(this, ''));
    } else {
      this._setZIndex(99);
      this._$calendar.slideDown('fast');
    }
  }

  @bind
  _handleApplyButtonClick(isToggle = true) {
    const [start, end] = this._datepicker.selectedDates;
    if (start) {
      this._setValue('start', this._prepareDate(start));
    } else {
      this._setValue('start', '');
    }
    if (end) {
      this._setValue('end', this._prepareDate(end));
    } else {
      this._setValue('end', '');
    }
    if (isToggle) {
      this._handleInputClick();
    }
  }

  @bind
  _handleDocumentClick(event) {
    const targetClass = `.${$(event.target, this._$element).attr('class')}`;
    if (
      !DateDropdown.isClosest({ targetClass, $element: this._$element, event })
    ) {
      this._datepicker.hide();
    }
  }

  _setDates({ passStart, passEnd } = {}) {
    let start = passStart;
    let end = passEnd;
    if (!start && end) {
      start = new Date(end);
      start.setDate(start.getDate() - 1);
    }
    if (start && !end) {
      end = new Date(start);
      end.setDate(end.getDate() + 1);
    }
    this._datepicker.selectDate([start, end]);
  }

  _getValue(type = '') {
    if (DateDropdown._checkType(type)) {
      return this[`_input${upperFirst(type)}`].val();
    }
    return '';
  }

  _setValue(type = '', value = '') {
    if (DateDropdown._checkType(type)) {
      return this[`_input${upperFirst(type)}`].val(value);
    }
    return '';
  }
}

export default DateDropdown;
