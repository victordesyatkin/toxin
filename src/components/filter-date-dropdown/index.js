import bind from 'bind-decorator';

import { renderComponents, renderComponent } from '../../assets/helpers/utils';
import Calendar from '../calendar';
import './filter-date-dropdown.scss';

class FilterDateDropdown {
  static CLASS_NAME = 'FILTER_DATE_DROPDOWN';
  static TYPE_FAKE = 0;
  static TYPE_MAIN = 3;
  static TYPE_INPUT = 1;
  static TYPE_CLEAN = 0;
  static TYPE_APPLY = 1;
  static IS_CALENDAR = 1;

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-filter-date-dropdown',
      render: render || FilterDateDropdown._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: FilterDateDropdown.CLASS_NAME,
      someClass: FilterDateDropdown,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Calendar.renderComponents({ parents: this._$element });
    this._options = this._$element.data('options');
    this._dummy = this._options.dummy || 'ДД МЕС';
    this._separator = this._options.separator || '-';
    this._$fake = $(
      `input[data-type="${FilterDateDropdown.TYPE_FAKE}"]`,
      this._$element
    );
    this._$sectionUp = $(
      '.js-filter-date-dropdown__section-up',
      this._$element
    );
    this._$sectionUp.on('click', this._handleMainBlockClick);
    this._$mainBlock = $(
      `div[data-type="${FilterDateDropdown.TYPE_MAIN}"]`,
      this._$element
    );
    this._$input = $(
      `input[type="hidden"][data-type=${FilterDateDropdown.TYPE_INPUT}]`,
      this._$element
    );
    this._datepicker = $(
      `input[type="hidden"][date-isCalendar="${FilterDateDropdown.IS_CALENDAR}"]`,
      this._$element
    )
      .datepicker()
      .data('datepicker');
    this._buttonClean = $(
      `button[data-type="${FilterDateDropdown.TYPE_CLEAN}"]`,
      this._$element
    );
    this._buttonApply = $(
      `button[data-type="${FilterDateDropdown.TYPE_APPLY}"]`,
      this._$element
    );
    this._buttonClean.on('click', this._handleCleanButtonClick);
    this._buttonApply.on('click', this._handleApplyButtonClick);
    $(document).on('click', this._handleDocumentClick);
    this._isForcedVisible = this._$element.hasClass(
      'filter-date-dropdown_forced-expanded'
    );
    this._setDates(this._getValue());
    this._changeFake();
  }

  _prepareDate(date) {
    if (!date) {
      return this._dummy;
    }
    date = new Date(date);
    date = date
      .toLocaleString('ru', {
        day: '2-digit',
        month: 'short',
      })
      .replace('.', '');
    return date;
  }

  _changeFake() {
    const selectedDates = this._$input.val();
    const [start, end] = (selectedDates && JSON.parse(selectedDates)) || [];
    this._$fake.val(
      `${this._prepareDate(start)} ${this._separator} ${this._prepareDate(end)}`
    );
  }

  @bind
  _handleCleanButtonClick() {
    this._$input.val('');
    this._changeFake();
  }

  @bind
  _handleApplyButtonClick() {
    const selectedDates = this._datepicker.selectedDates || [];
    this._$input.val(JSON.stringify(selectedDates));
    this._changeFake();
    this._handleMainBlockClick();
  }

  @bind
  _handleMainBlockClick() {
    if (this._isForcedVisible) {
      return false;
    }
    this._$mainBlock.fadeToggle('fast');
    this._$element.toggleClass('filter-date-dropdown_expanded');
  }

  @bind
  _handleDocumentClick(event) {
    if (this._forcedVisible) {
      return false;
    }
    const classTarget = `.${$(event.target, this._$element).attr('class')}`;
    if (
      !$(event.target).closest(this._$element).length &&
      !$(event.target, this._$element).hasClass('datepicker--cell') &&
      !$(classTarget, this._$element).length &&
      this._$element.hasClass('filter-date-dropdown_expanded')
    ) {
      this._$mainBlock.slideUp();
      this._$element.removeClass('filter-date-dropdown_expanded');
    }
  }

  _setDates([start, end] = []) {
    if (!start && !end) {
      return false;
    }
    this._datepicker.selectDate([new Date(start), new Date(end)]);
  }

  _setValue(value = []) {
    this._$input.val(JSON.stringify(value));
  }

  _value2Date(value) {
    const parts = value.split('.');
    const partDay = parts[0];
    const partMonth = parts[1];
    const partYear = parts[2];
    let date = '';
    if (partDay && partMonth && partYear) {
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

  _getValue() {
    if (localStorage && localStorage.getItem('landingPage')) {
      let landingPage = localStorage.getItem('landingPage') || '{}';
      landingPage = JSON.parse(landingPage);
      let { startDate, endDate } = landingPage;
      if (!isNaN(parseFloat(startDate)) && !isNaN(parseFloat(endDate))) {
        startDate = this._value2Date(startDate);
        endDate = this._value2Date(endDate);
        this._setValue([startDate, endDate]);
        if (startDate && endDate) {
          return [startDate, endDate];
        }
      }
    }
    return JSON.parse(this._$input.val() || '[]');
  }
}

export default FilterDateDropdown;
