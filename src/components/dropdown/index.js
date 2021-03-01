import bind from 'bind-decorator';
import get from 'lodash/get';

import { Component } from '../../helpers/utils';
import DropdownTitleTextField from '../dropdown-title-text-field';
import DropDownSummary from './DropdownSummary';
import DropdownItem from '../dropdown-item';
import './dropdown.scss';
import Control from '../control';

class Dropdown extends Component {
  static CONTROLS = {
    clean: '_handleCleanButtonClick',
    apply: '_handleApplyButtonClick',
  };

  _query = '.js-dropdown';

  _className = 'dropdown';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  @bind
  updateSummary(summary) {
    this._dropDownTitleTextField.updateSummary(summary);
  }

  toggleOpen() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      console.log('CLOSE 3');
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this._isOpened = true;
    this._$element.addClass(`${this._className}_opened`);
    this._dropDownTitleTextField.open();
  }

  close() {
    console.log('CLOSE 4');
    this._isOpened = false;
    this._$element.removeClass(`${this._className}_opened`);
    this._dropDownTitleTextField.close();
  }

  _init() {
    const { dropdown = {}, items, control } = this._props;
    const { isOpened, type, map, together, placeholder } = dropdown;
    this._isOpened = isOpened;
    this._dropDownTitleTextField = new DropdownTitleTextField({
      parent: this._$element,
      props: {
        ...this._props,
        handleTitleClick: this._handleDropdownTitleTextFieldClick,
        handleTextFieldClick: this._handleDropdownTitleTextFieldClick,
      },
    });
    if (control) {
      this._control = new Control({
        parent: $(`${this._query}__control`, this._$element),
        props: {
          ...control,
          handleButtonClick: this._handleControlClick,
        },
      });
    }
    this._dropDownSummary = new DropDownSummary({
      items,
      type,
      map,
      together,
      placeholder,
      updateSummary: this.updateSummary,
      handleEmptySummary: this._hideCleanButton,
      handleFillSummary: this._showCleanButton,
    });
    this._items = [];
    this._$items = $(`${this._query}__li-item`, this._$element);
    this._$items.each(this._renderItem);
    if (this._isOpen) {
      this.open();
    }
    $('body').on('click', this._handleBodyClick);
  }

  @bind
  _handleControlClick(type) {
    // console.log('_handleControlClick : ', type);
    if (Dropdown.CONTROLS[type]) {
      // //console.log('Dropdown.CONTROLS[type] : ', Dropdown.CONTROLS[type]);
      this[Dropdown.CONTROLS[type]]();
    }
  }

  @bind
  _handleDropdownTitleTextFieldClick() {
    this.toggleOpen();
  }

  @bind
  _renderItem(index, element) {
    // console.log('_renderItem : ');
    const props = get(this._props, ['items', index]);
    const item = new DropdownItem({
      parent: element,
      props: { ...props, handleInputChange: this._handleInputChange },
    });
    this._items.push(item);
  }

  @bind
  _handleInputChange(item) {
    // console.log('_handleInputChange : ', item);
    this._dropDownSummary.updateItems({
      [item.name]: item,
    });
  }

  @bind
  _handleCleanButtonClick() {
    this._items.forEach((item) => {
      item.cleanValue();
    });
  }

  @bind
  _handleApplyButtonClick() {
    console.log('CLOSE 2');
    this.close();
  }

  @bind
  _hideCleanButton() {
    if (this._control) {
      this._control.hide();
    }
    this._dropDownTitleTextField.empty();
  }

  @bind
  _showCleanButton() {
    console.log('_showCleanButton : ', this._control);
    if (this._control) {
      this._control.show();
    }
    this._dropDownTitleTextField.fill();
  }

  @bind
  _handleBodyClick(event) {
    if (this._isOpened) {
      const { target } = event;
      if (!$(target).closest(this._$element).length) {
        console.log('CLOSE 1');
        this.close();
      }
    }
  }
}

export default Dropdown;
