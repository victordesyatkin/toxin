import bind from 'bind-decorator';
import get from 'lodash/get';

import { Component, isValidDate } from '../../helpers/utils';
import Calendar from '../calendar';
import DropdownTitleTextField from '../dropdown-title-text-field';
import './filter-date-dropdown.scss';

class FilterDateDropdown extends Component {
  static _maskedDate(date) {
    return date
      .toLocaleString('ru', {
        day: '2-digit',
        month: 'short',
      })
      .replace('.', '');
  }

  _query = '.js-filter-date-dropdown';

  _className = 'filter-date-dropdown';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  open() {
    this._isOpened = true;
    this._$element.addClass(`${this._className}_opened`);
    this._dropdownTitleTextField.open();
  }

  close() {
    this._isOpened = false;
    this._$element.removeClass(`${this._className}_opened`);
    this._dropdownTitleTextField.close();
  }

  clean() {
    let summary = '';
    const { separator = ' - ' } = this._props;
    this._$items.each((index, element) => {
      const { placeholder = '' } = get(this._props, ['items', index], '');
      summary += summary ? `${separator}${placeholder}` : placeholder;
      $(element).val('');
    });
    this._dropdownTitleTextField.updateSummary(summary);
  }

  _init() {
    const {
      dropdownTitleTextField,
      calendar,
      isOpened,
      items = [],
    } = this._props;
    this._isOpened = isOpened;
    const start = get(items, [0, 'value']);
    const end = get(items, [1, 'value']);
    this._$items = $(`${this._query}__item`, this._$element);
    this._dropdownTitleTextField = new DropdownTitleTextField({
      parent: $(`${this._query}__dropdown-title-text-field`),
      props: {
        ...dropdownTitleTextField,
        handleDropdownTitleTextFieldClick: this._toggleOpen,
      },
    });
    console.log('start : ', start);
    this._calendar = new Calendar({
      parent: $(`${this._query}__calendar`, this._$element),
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
      if (!$(target).closest(this._$element).length) {
        this.close();
      }
    }
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
  _handleCleanButtonClick() {
    return this.clean();
  }

  @bind
  _handleApplyButtonClick() {
    this.close();
  }

  _prepareValues(dates = []) {
    console.log('this._$items : ', this._$items);
    dates.forEach((date, index) => {
      if (this._$items[index]) {
        $(this._$items[index]).val(isValidDate(date) ? date : '');
      }
    });
  }

  _prepareSummary(dates = []) {
    const { separator = ' - ' } = this._props;
    let summary = '';
    dates.forEach((date, index) => {
      const { placeholder = '' } = get(this._props, ['items', index], '');
      const part = isValidDate(date)
        ? FilterDateDropdown._maskedDate(date)
        : placeholder;
      summary += summary ? `${separator}${part}` : part;
    });
    this._dropdownTitleTextField.updateSummary(summary);
  }

  @bind
  _handleCalendarClick(dates = []) {
    this._prepareValues(dates);
    this._prepareSummary(dates);
  }
}

export default FilterDateDropdown;
