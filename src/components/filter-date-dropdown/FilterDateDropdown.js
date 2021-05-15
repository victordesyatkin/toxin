import bind from 'bind-decorator';

import { Component, isValidDate, deepCheckerOutsideClick } from '../../helpers';
import Calendar from '../calendar';
import DropdownTitleTextField from '../dropdown-title-text-field';

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
  }

  @bind
  close() {
    this._isOpened = false;
    this._$element.removeClass(`${this._className}_opened`);
  }

  clean() {
    let summary = '';
    const { separator = ' - ' } = this._props;
    this._$items.each((index, element) => {
      const { placeholder = '' } = this._props?.items?.[index] || '';
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
    const start = items?.[0]?.value;
    const end = items?.[1]?.value;
    this._$items = $(`${this._query}__item`, this._$element);
    this._dropdownTitleTextField = new DropdownTitleTextField({
      parent: $(`${this._query}__dropdown-title-text-field`),
      props: {
        ...dropdownTitleTextField,
        handleDropdownTitleTextFieldClick: this._toggleOpen,
      },
    });
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
    this._bindEventListeners();
  }

  _bindEventListeners() {
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleBodyClick(event) {
    const isClickedOutside = deepCheckerOutsideClick({
      event,
      isOpened: this._isOpened,
      $parent: this._$element,
    });
    if (isClickedOutside) {
      this.close();
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
      const { placeholder = '' } = this._props?.items?.[index] || '';
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
