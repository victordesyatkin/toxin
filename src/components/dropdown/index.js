import bind from 'bind-decorator';
import get from 'lodash/get';

import { Component } from '../../helpers/utils';
import DropdownTitleControl from '../dropdown-title-control';
import PlaceholderRooms from './PlaceholderRooms';
import PlaceholderGuests from './PlaceholderGuests';
import Placeholder from './Placeholder';
import DropdownItem from '../dropdown-item';
import './dropdown.scss';

class Dropdown extends Component {
  static typeFirst = 0;

  static typeSecond = 1;

  static cleanInputValue(index, element) {
    $('input', element).val(0);
    $('.js-dropdown__item-value', element).text(0);
  }

  _query = '.js-dropdown';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    this._dropDownTitleControl = new DropdownTitleControl({
      parent: this._$element,
      props: {
        ...this._props,
        handleTitleClick: this._handleDropdownTitleControlClick,
        handleTextFieldClick: this._handleDropdownTitleControlClick,
      },
    });

    // const { type = 0, isForcedExpanded = false, isExpanded = false } = dropdown;
    // this._isForcedExpanded = isForcedExpanded;
    // this._isExpanded = isExpanded;
    // this._input = new TextField({
    //   parent: $(`${this._query}__text-field`, this._$element),
    //   props: {
    //     ...input,
    //     handleInputClick: this._handleExpandButtonClick,
    //   },
    // });
    // this._type = parseInt(type, 10);
    // this._items = [];
    // this._$items = $(`${this._query}__item`, this._$element);
    // this._$items.each(this._renderItem);
    // this._$main = $(`${this._query}__main`, this._$element);
    // if (this._isExpanded || this._isForcedExpanded) {
    //   this._expand();
    // }
    // this._inputs = {};
    // this._input = this._$mainInputs[0].data('INPUT');
    // this._$mainInput = this._input.input;
    // this._$mainInput.attr('disabled', true);
    // this._$inputSection = $('.js-dropdown__input', this._$element);
    // this._$inputSection.on('click', this._handleExpandButtonClick);
    // this._mainPlaceholder = this._$mainInput.attr('placeholder');
    // this._$dropdownMain = $('.js-dropdown__main', this._$element);
    // this._$buttonExpand = $('.js-input__button', this._$element);
    // this._$buttonClean = $('button[name="clean"]', this._$dropdownMain);
    // this._$buttonClean.on('click', this._handleCleanButtonClick);
    // this._$buttonApply = $('button[name="apply"]', this._$dropdownMain);
    // this._$buttonApply.on('click', this._handleApplyButtonClick);
    // this._$main = $('.js-dropdown__main', this._$element);
    // this._isForcedExpand = this._$element.hasClass('dropdown_forced-expanded');
    // this._prepareItems();
    // this._createPlaceholder();
    // this._updatePlaceholder();
    // this._toggleCleanButton();
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleDropdownTitleControlClick() {
    console.log('_handleDropdownTitleControlClick : ');
  }

  _renderItem(index, element) {
    const props = get(this._props, ['dropdown', 'items', index]);
    const item = new DropdownItem({ parent: element, props });
    this._items.push(item);
  }

  _toggleCleanButton() {
    let flag = false;
    const inputs = Object.values(this._inputs);
    for (let i = 0, { length } = inputs; i < length; i += 1) {
      if (parseInt(inputs[i], 10)) {
        flag = true;
        break;
      }
    }
    if (flag) {
      this._$buttonClean.removeClass('dropdown__control-button_hide');
    } else {
      this._$buttonClean.addClass('dropdown__control-button_hide');
    }
  }

  @bind
  _handleExpandButtonClick() {
    if (this._isForcedExpanded) {
      return undefined;
    }
    this._toggleExpanded();
    return undefined;
  }

  @bind
  _handleCleanButtonClick() {
    Object.keys(this._inputs).forEach((key) => {
      this._inputs[key] = 0;
    });
    $('.js-dropdown__item', this._$dropdownMain).each(Dropdown.cleanInputValue);
    this._updatePlaceholder();
    this._toggleCleanButton();
  }

  _createPlaceholder() {
    switch (this._type) {
      case Dropdown.typeFirst: {
        this._placeholder = new PlaceholderRooms(this._inputs);
        break;
      }
      case Dropdown.typeSecond: {
        this._placeholder = new PlaceholderGuests(this._inputs);
        break;
      }
      default: {
        this._placeholder = new Placeholder(this._inputs);
      }
    }
  }

  _updatePlaceholder() {
    const placeholder = this._placeholder._toString();
    if (placeholder) {
      this._$mainInput.attr('placeholder', placeholder);
      this._$mainInput.val(placeholder);
      this._input.addTheme('dropdown_fill');
    } else {
      this._$mainInput.attr('placeholder', this._mainPlaceholder);
      this._$mainInput.val(this._mainPlaceholder);
      this._input.removeTheme('dropdown_fill');
    }
  }

  @bind
  _handleChangeChildInput(event = {}) {
    const { target } = event;
    const $input = $(target);
    const title = $input.attr('data-title');
    this._inputs[title] = $input.val();
    this._updatePlaceholder();
    this._toggleCleanButton();
  }

  _toggleZIndex(zIndex = 1) {
    this._$main.css('z-index', zIndex);
    return false;
  }

  @bind
  _handleApplyButtonClick() {
    this._handleExpandButtonClick();
  }

  @bind
  _handleBodyClick(event) {
    if (
      this._$element.hasClass('dropdown_expanded') &&
      !$(event.target).closest(this._$element).length
    ) {
      this._minimize();
    }
  }

  @bind
  _expand() {
    if (!this._$element.hasClass('dropdown_expanded')) {
      this._$element.addClass('dropdown_expanded');
      this._input.straight();
      this._input.expand();
    }
  }

  @bind
  _minimize() {
    if (
      !this._isForcedExpanded &&
      this._$element.hasClass('dropdown_expanded')
    ) {
      this._$element.removeClass('dropdown_expanded');
      this._input.common();
      this._input.minimize();
    }
  }

  _toggleExpanded() {
    this._$element.toggleClass('dropdown_expanded');
    this._input.toggleStraight();
  }

  _prepareItems() {
    this._$items = $('.js-dropdown__item', this._$dropdownMain);
    const data = {};
    const names = ['adults', 'babies', 'children'];
    if (localStorage && localStorage.getItem('landingPage')) {
      let landingPage = localStorage.getItem('landingPage') || '{}';
      landingPage = JSON.parse(landingPage);
      Object.keys(landingPage).forEach((name) => {
        if (names.indexOf(name) === -1) {
          return false;
        }
        if (!Number.isNaN(parseFloat(landingPage[name]))) {
          data[name] = parseFloat(landingPage[name]);
        }
        return false;
      });
    }

    Array.prototype.map.call(this._$items, (item) => {
      const $input = $($('input', item));
      const title = $input.attr('data-title');
      $input.on('input', this._handleChangeChildInput);
      const name = $input.attr('name');
      if (typeof data[name] !== 'undefined') {
        const value = data[name];
        $input.val(value);
      }
      this._inputs[title] = parseInt($input.val(), 10) || 0;
      return new Element(item, this._inputs[title]);
    });
  }
}

export default Dropdown;
