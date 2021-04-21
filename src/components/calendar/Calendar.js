import bind from 'bind-decorator';

import { Component } from '../../helpers';
import Control from '../control';
import AirDatepicker from '../air-datepicker';

class Calendar extends Component {
  static CONTROLS = {
    clean: '_handleCleanButtonClick',
    apply: '_handleApplyButtonClick',
  };

  _query = '.js-calendar';

  _className = 'calendar';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this._random = Math.random().toString(32);
    const { options, control, start, end, today } = this._props;
    this._airDatepicker = new AirDatepicker({
      parent: $(`${this._query}__date-picker`, this._$element),
      props: {
        options,
        start,
        end,
        today,
        handleCalendarClick: this._handleCalendarClick,
      },
    });
    this._control = new Control({
      parent: $(`${this._query}__control`, this._$element),
      props: { control, handleButtonClick: this._handleControlClick },
    });
    this._$element.on('click', this._handleBlockClick);
    this._airDatepicker?.selectDate({ start, end });
  }

  @bind
  _handleControlClick(type) {
    if (Calendar.CONTROLS[type]) {
      this[Calendar.CONTROLS[type]]();
    }
  }

  @bind
  _handleCleanButtonClick() {
    this._airDatepicker?.clear();
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
  _handleCalendarClick(dates) {
    this._toggleVisibleButtonClean();
    const { handleCalendarClick } = this._props;
    if (handleCalendarClick) {
      handleCalendarClick(dates);
    }
    return false;
  }

  _toggleVisibleButtonClean() {
    const selectedDates = this._airDatepicker?.selectedDates || [];
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
}

export default Calendar;
