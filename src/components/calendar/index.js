import datepicker from 'air-datepicker'; /* eslint-disable-line */
import get from 'lodash/get';
import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import Control from '../control';
import './calendar.scss';

class Calendar extends Component {
  static CONTROLS = {
    clean: '_handleCleanButtonClick',
    apply: '_handleApplyButtonClick',
  };

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

  static _isHideInRange({ cellType, date, rangeFromDate }) {
    return (
      rangeFromDate &&
      cellType === 'day' &&
      rangeFromDate === new Date(date).getTime()
    );
  }

  static _isValidDate({ partDay, partMonth, partYear }) {
    return partDay && partMonth && partYear;
  }

  static _value2Date(value = '') {
    const parts = value.split('.');
    const partDay = parts[0];
    const partMonth = parts[1];
    const partYear = parts[2];
    let date = '';
    if (Calendar._isValidDate({ partDay, partMonth, partYear })) {
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

  _query = '.js-calendar';

  _className = 'className';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { options, control } = this._props;
    this._rangeFromDate = '';
    this._options = {
      ...Calendar.OPTIONS,
      ...options,
      onSelect: this._handlerSelect,
      onRenderCell: this._onRenderCell,
    };
    this._options = this._prepareOptions(this._options);
    this._$input = $(`${this._query}__text-field`, this._$element);
    this._$input.datepicker(this._options);
    this._datepicker = this._$input.datepicker().data('datepicker');
    this._control = new Control({
      parent: $(`${this._query}__control`),
      props: { control, handleButtonClick: this._handleControlClick },
    });
    this._$element.on('click', this._handleBlockClick);
    this._toggleVisibleButtonClean();
    this._selectDate();
  }

  @bind
  _onRenderCell(date, cellType) {
    if (
      Calendar._isHideInRange({
        cellType,
        date,
        rangeFromDate: this._rangeFromDate,
      })
    ) {
      return {
        classes: '-hide-in-range-',
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
  _handlerSelect(formattedDate, passDate) {
    const date = passDate || [];
    const { range } = this._options;
    const { handlerSelect } = this._props;
    if (range) {
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
    if (handlerSelect) {
      handlerSelect(date);
    }
    return false;
  }

  _toggleVisibleButtonClean() {
    const selectedDatesLength = get(this._datepicker, ['selectedDates'], [])
      .length;
    if (selectedDatesLength) {
      this._control.show();
    } else {
      this._control.hide();
    }
  }

  @bind
  _handleBlockClick() {
    this._toggleVisibleButtonClean();
  }

  _prepareOptions(tempOptions) {
    let options = { ...tempOptions };
    const minDateType = get(this._props, ['options', 'minDateType']);
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
    let start = Calendar._value2Date(get(this._props, ['options', 'start']));
    let end = Calendar._value2Date(get(this._props, ['options', 'end']));
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
