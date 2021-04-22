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
    const { options, control, start, end, today } = this._props;
    this._control = new Control({
      parent: $(`${this._query}__control`, this._$element),
      props: { control, handleButtonClick: this._handleControlClick },
    });
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
    this._toggleVisibleButtonClean(dates);
    const { handleCalendarClick } = this._props;
    if (handleCalendarClick) {
      handleCalendarClick(dates);
    }
    return false;
  }

  _toggleVisibleButtonClean(dates = []) {
    const [start, end] = dates || [];
    if (start || end) {
      this._control?.show();
    } else {
      this._control?.hide();
    }
  }
}

export default Calendar;
