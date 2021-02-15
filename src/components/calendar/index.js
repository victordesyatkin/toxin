import datepicker from 'air-datepicker';
import get from 'lodash/get';
import bind from 'bind-decorator';

import { renderComponents, renderComponent } from '../../helpers/utils';

import './calendar.scss';

class Calendar {
  static OPTIONS = {
    inline: true,
    language: 'ru',
    range: true,
    navTitles: {
      days: 'MM yyyy',
      months: 'yyyy',
      years: 'yyyy1 - yyyy2',
    },
    multipleDates: true,
    nextHtml: '<span class="icon-arrow_forward"></span>',
    prevHtml: '<span class="icon-arrow_prev"></span>',
  };

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-calendar',
      render: render || Calendar._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: Calendar.CLASS_NAME,
      SomeClass: Calendar,
    });
  }

  static _isValidDate({ partDay, partMonth, partYear }) {
    return partDay && partMonth && partYear;
  }

  static _isHideInRange({ cellType, date }) {
    return (
      this._rangeFromDate &&
      cellType === 'day' &&
      this._rangeFromDate === new Date(date).getTime()
    );
  }

  static _onRenderCell(date, cellType) {
    if (Calendar._isHideInRange({ cellType, date })) {
      return {
        classes: '-hide-in-range-',
      };
    }
    return undefined;
  }

  static _value2Date(value = '') {
    const parts = value.split('.');
    const partDay = parts[0];
    const partMonth = parts[1];
    const partYear = parts[2];
    let date = '';
    if (Calendar._isValidDate()) {
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

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._$input = $('input', this._$element);
    this._rangeFromDate = '';
    this._init();
  }

  _init() {
    this._options = {
      ...Calendar.OPTIONS,
      ...get(this._$element.data(), ['options']),
      onSelect: this._handlerSelect,
      onRenderCell: Calendar._onRenderCell(this),
    };
    this._options = this._prepareOptions(this._options);
    this._$input.datepicker(this._options);
    this._datepicker = this._$input.datepicker().data('datepicker');
    this._$main = $('.js-calendar__main', this._$element);
    this._$buttonClean = $('.js-calendar__button_clean', this._$element).on(
      'click',
      this._handleCleanButtonClick
    );
    this._$element.on('click', this._handleBlockClick);
    this._toggleVisibleButtonClean();
    this._selectDate();
  }

  @bind
  _handlerSelect(formattedDate, date = {}) {
    if (this._options.range) {
      if (Object.prototype.toString.call(date) !== '[object Array]') {
        return false;
      }
      const { length } = date;
      if (length === 1) {
        this._rangeFromDate = new Date(date[0]).getTime();
      } else if (this._rangeFromDate) {
        this._rangeFromDate = '';
      }
    }
    this._toggleVisibleButtonClean();
    return false;
  }

  @bind
  _handleCleanButtonClick() {
    this._datepicker.clear();
  }

  _toggleVisibleButtonClean() {
    const selectedDatesLength = get(this._datepicker, ['selectedDates'], [])
      .length;
    if (
      !this._$buttonClean.hasClass('calendar__button_hide') &&
      !selectedDatesLength
    ) {
      this._$buttonClean.addClass('calendar__button_hide');
    } else if (
      this._$buttonClean.hasClass('calendar__button_hide') &&
      selectedDatesLength
    ) {
      this._$buttonClean.removeClass('calendar__button_hide');
    }
  }

  @bind
  _handleBlockClick() {
    this._toggleVisibleButtonClean();
  }

  _prepareOptions(tempOptions) {
    let options = { ...tempOptions };
    const minDateType = get(this._$element.data(), ['options', 'minDateType']);
    switch (minDateType) {
      case 'current': {
        options = { ...options, minDate: new Date() };
        break;
      }
      default: {
        break;
      }
    }
    return options;
  }

  _selectDate() {
    let start = Calendar._value2Date(
      get(this._$element.data(), ['options', 'start'])
    );
    let end = Calendar._value2Date(
      get(this._$element.data(), ['options', 'end'])
    );
    if (end && !start) {
      start = new Date();
      start = start.setDate(end.getDate() - 1);
    }
    if (start && !end) {
      end = new Date();
      end = end.setDate(start.getDate() + 1);
    }
    if (start && end) {
      this._datepicker.selectDate([start, end]);
    }
  }
}

export default Calendar;
