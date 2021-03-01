import bind from 'bind-decorator';
import get from 'lodash/get';

import { Component, isValidDate } from '../../helpers/utils';
import Calendar from '../calendar';
import './date-dropdown.scss';
import DropdownTitleControl from '../dropdown-title-text-field';

class DateDropdown extends Component {
  static TYPES = ['start', 'end'];

  static _maskedDate(passDate) {
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

  _query = '.js-date-dropdown';

  _className = 'date-dropdown';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  open() {
    this._$element.addClass(`${this._className}_opened`);
    this._items.forEach((item) => item.open());
    this._isOpened = true;
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
    this._items.forEach((item) => item.close());
    this._isOpened = false;
  }

  clean() {
    this._items.forEach((item = {}, index) => {
      const { placeholder = '' } = get(
        this._props,
        ['items', index, 'maskedTextField', 'textField'],
        ''
      );
      item.updateSummary(placeholder);
      item.cleanValue();
    });
  }

  _init() {
    const { calendar, isOpened, items } = this._props;
    this._items = [];
    this._isOpened = isOpened;
    this._$items = $(`${this._query}__item`, this._$element);
    this._$items.each(this._renderItem);
    const start = get(items, [0, 'maskedTextField', 'textField', 'value']);
    const end = get(items, [1, 'maskedTextField', 'textField', 'value']);
    this._calendar = new Calendar({
      parent: $(`${this._query}__calendar`),
      props: {
        ...calendar,
        handleCleanButtonClick: this._handleCleanButtonClick,
        handleApplyButtonClick: this._handleApplyButtonClick,
        handleCalendarClick: this._handleCalendarClick,
        start,
        end,
      },
    });
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleBodyClick(event) {
    if (this._isOpened) {
      const { target } = event;
      const path = event?.originalEvent?.path || [];
      let isClosest = false;
      path.forEach((item) => {
        if (!isClosest) {
          isClosest = $(item).closest(this._$element).length;
        }
      });
      if (!$(target).closest(this._$element).length && !isClosest) {
        this.close();
      }
    }
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

  _prepareValues(dates = []) {
    dates.forEach((date, index) => {
      this._items[index].updateValue(isValidDate(date) ? date : '');
    });
  }

  _prepareSummary(dates = []) {
    dates.forEach((date, index) => {
      const { placeholder = '' } = get(
        this._props,
        ['items', index, 'maskedTextField', 'textField'],
        ''
      );
      this._items[index].updateSummary(
        isValidDate(date) ? DateDropdown._maskedDate(date) : placeholder
      );
    });
  }

  @bind
  _handleCalendarClick(dates = []) {
    this._prepareValues(dates);
    this._prepareSummary(dates);
  }

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
  _handleApplyButtonClick() {
    this.close();
  }
}

export default DateDropdown;
