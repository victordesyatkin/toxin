import bind from 'bind-decorator';

import { Component, isValidDate, isString } from '../../helpers/utils';
import Control from '../control';
import '../air-datepicker';

class Calendar extends Component {
  static CONTROLS = {
    clean: '_handleCleanButtonClick',
    apply: '_handleApplyButtonClick',
  };

  static SELECTED_TYPE_START = 'start';

  static SELECTED_TYPE_END = 'end';

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

  static _isHideInRange({
    cellType,
    date,
    rangeFromDate,
    rangeFromDateClasses,
  }) {
    return (
      rangeFromDate &&
      cellType === 'day' &&
      rangeFromDate === new Date(date).getTime() &&
      rangeFromDateClasses
    );
  }

  static _isCorrectToday({ cellType, date, today }) {
    return (
      cellType === 'day' &&
      new Date(today).getTime() === new Date(date).getTime()
    );
  }

  static _isValidDateByParts({ partDay, partMonth, partYear }) {
    return partDay && partMonth && partYear;
  }

  static _prepareDate(passDate = '') {
    let date = '';
    if (passDate && isString(passDate)) {
      const [partDay, partMonth, partYear] = passDate.split('.');
      if (Calendar._isValidDateByParts({ partDay, partMonth, partYear })) {
        date = new Date(`${partMonth}.${partDay}.${partYear}`);
        if (!isValidDate(date)) {
          date = '';
        }
      }
    }
    return date;
  }

  static _value2Date(value = '') {
    let date = new Date(value);
    if (!isValidDate(date)) {
      date = Calendar._prepareDate(value);
    }
    return date;
  }

  _query = '.js-calendar';

  _className = 'calendar';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { options, control, start, end } = this._props;
    this._rangeFromDate = '';
    this._rangeFromDateClasses = '';
    this._selectType = '';
    this._options = {
      ...Calendar.OPTIONS,
      ...options,
      onSelect: this._handleCalendarClick,
      onRenderCell: this._onRenderCell,
    };
    this._options = this._prepareOptions(this._options);
    this._$input = $(`${this._query}__text-field`, this._$element);
    this._$input.datepicker(this._options);
    this._datepicker = this._$input.datepicker().data('datepicker');
    this._control = new Control({
      parent: $(`${this._query}__control`, this._$element),
      props: { control, handleButtonClick: this._handleControlClick },
    });
    this._$element.on('click', this._handleBlockClick);
    this._selectDate({ start, end });
  }

  _selectDate({ start: passStart, end: passEnd }) {
    const start = Calendar._value2Date(passStart);
    const end = Calendar._value2Date(passEnd);
    if (start && !end) {
      this._selectType = Calendar.SELECTED_TYPE_START;
      this._rangeFromDateClasses = '-hide-in-broken-range-';
    } else if (end && !start) {
      this._selectType = Calendar.SELECTED_TYPE_END;
    } else {
      this._selectType = '';
    }
    this._datepicker.selectDate([start, end]);
  }

  @bind
  _onRenderCell(date, cellType) {
    const { today } = this._props;
    if (
      Calendar._isCorrectToday({
        cellType,
        date,
        today,
      })
    ) {
      return {
        classes: '-current-',
      };
    }
    if (
      Calendar._isHideInRange({
        cellType,
        date,
        rangeFromDate: this._rangeFromDate,
        rangeFromDateClasses: this._rangeFromDateClasses,
      })
    ) {
      return {
        classes: this._rangeFromDateClasses,
      };
    }
    return undefined;
  }

  @bind
  _handleControlClick(type) {
    if (Calendar.CONTROLS[type]) {
      this[Calendar.CONTROLS[type]]();
    }
  }

  @bind
  _handleCleanButtonClick() {
    this._datepicker.clear();
    const { handleCleanButtonClick } = this._props;
    if (handleCleanButtonClick) {
      handleCleanButtonClick();
    }
  }

  @bind
  _handleApplyButtonClick() {
    const { handleApplyButtonClick } = this._props;
    if (handleApplyButtonClick) {
      handleApplyButtonClick();
    }
  }

  @bind
  _handleCalendarClick(formattedDate, passDate) {
    const dates = passDate || [];
    const { range } = this._options;
    if (range) {
      const { length } = dates;
      if (length === 1) {
        const [date] = dates;
        this._rangeFromDate = new Date(date).getTime();
        this._rangeFromDateClasses = this._selectType
          ? '-hide-in-broken-range-'
          : '-hide-in-range-';
        switch (this._selectType) {
          case Calendar.SELECTED_TYPE_START: {
            dates[1] = '';
            break;
          }
          case Calendar.SELECTED_TYPE_END: {
            dates[0] = '';
            dates[1] = date;
            break;
          }
          default: {
            dates[1] = '';
          }
        }
      } else if (!length) {
        dates[0] = '';
        dates[1] = '';
      } else {
        this._rangeFromDate = '';
        this._rangeFromDateClasses = '';
        this._selectType = '';
      }
    }
    this._toggleVisibleButtonClean();
    const { handleCalendarClick } = this._props;
    if (handleCalendarClick) {
      handleCalendarClick(dates);
    }
    return false;
  }

  _toggleVisibleButtonClean() {
    const selectedDates = this._datepicker?.selectedDates || [];
    const selectedDatesLength = selectedDates.length;
    if (selectedDatesLength) {
      this._control?.show();
    } else {
      this._control?.hide();
    }
  }

  @bind
  _handleBlockClick() {
    this._toggleVisibleButtonClean();
  }

  _prepareOptions(tempOptions) {
    let options = { ...tempOptions };
    const minDateType = this._props?.options?.minDateType;
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
}

export default Calendar;
