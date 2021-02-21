import bind from 'bind-decorator';
import get from 'lodash/get';

import { Component } from '../../helpers/utils';
import DropdownTitleControl from '../dropdown-title-control';
import DropDownInfo from '../dropdown-info';
import PlaceholderRooms from './PlaceholderRooms';
import PlaceholderGuests from './PlaceholderGuests';
import Placeholder from './Placeholder';
import DropdownItem from '../dropdown-item';
import './dropdown.scss';

class Dropdown extends Component {
  static cleanInputValue(index, element) {
    $('input', element).val(0);
    $('.js-dropdown__item-value', element).text(0);
  }

  _query = '.js-dropdown';

  _className = 'dropdown';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  toggleOpen() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this._$element.addClass(`${this._className}_opened`);
    this._dropDownTitleControl.open();
  }

  close() {
    this._$element.removeClass(`${this._className}_opened`);
    this._dropDownTitleControl.close();
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
    this._dropDownInfo = new DropDownInfo();
    this._items = [];
    this._$items = $(`${this._query}__li-item`, this._$element);
    this._$items.each(this._renderItem);

    // $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleDropdownTitleControlClick() {
    this.toggleOpen();
  }

  @bind
  _renderItem(index, element) {
    console.log('_renderItem : ');
    const props = get(this._props, ['items', index]);
    const item = new DropdownItem({
      parent: element,
      props: { ...props, handleInputChange: this._handleInputChange },
    });
    this._items.push(item);
  }

  @bind
  _handleInputChange(data = {}) {
    console.log('_handleInputChange : ', data);
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
