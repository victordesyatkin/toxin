import 'air-datepicker';
import bind from 'bind-decorator';

import { Component, value2Date } from '../../helpers';

class AirDatepicker extends Component {
  static SELECTED_TYPE_START = 'start';

  static SELECTED_TYPE_END = 'end';

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

  _query = '.js-air-datepicker';

  _className = 'air-datepicker';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  get selectedDates() {
    return this._datepicker?.selectedDates || [];
  }

  @bind
  clear() {
    return this._datepicker?.clear();
  }

  _init() {
    const { options, start, end } = this._props;
    this._rangeFromDate = '';
    this._rangeFromDateClasses = '';
    this._selectType = '';
    this._readyOptions = {
      ...AirDatepicker.OPTIONS,
      ...options,
      onSelect: this._handleCalendarClick,
      onRenderCell: this._onRenderCell,
    };
    this._readyOptions = this._prepareOptions(this._readyOptions);
    this._$element.datepicker(this._readyOptions);
    this._datepicker = this._$element.data('datepicker');
    this._selectDate({ start, end });
  }

  _selectDate({ start: passStart, end: passEnd }) {
    const start = value2Date(passStart);
    const end = value2Date(passEnd);
    if (start && !end) {
      this._selectType = AirDatepicker.SELECTED_TYPE_START;
      this._rangeFromDateClasses = '-hide-in-broken-range-';
    } else if (end && !start) {
      this._selectType = AirDatepicker.SELECTED_TYPE_END;
    } else {
      this._selectType = '';
    }
    this._datepicker.selectDate([start, end]);
  }

  @bind
  _handleCalendarClick(formattedDate, passDate) {
    const dates = passDate || [];
    const { range } = this._readyOptions;
    if (range) {
      const { length } = dates;
      if (length === 1) {
        const [date] = dates;
        this._rangeFromDate = new Date(date).getTime();
        this._rangeFromDateClasses = this._selectType
          ? '-hide-in-broken-range-'
          : '-hide-in-range-';
        switch (this._selectType) {
          case AirDatepicker.SELECTED_TYPE_START: {
            dates[1] = '';
            break;
          }
          case AirDatepicker.SELECTED_TYPE_END: {
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
    const { handleCalendarClick } = this._props;
    if (handleCalendarClick) {
      handleCalendarClick(dates);
    }
    return false;
  }

  @bind
  _onRenderCell(date, cellType) {
    const { today } = this._props;
    if (
      AirDatepicker._isCorrectToday({
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
      AirDatepicker._isHideInRange({
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

export default AirDatepicker;
