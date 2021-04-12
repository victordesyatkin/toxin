import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import DropDownSummary from '../dropdown-summary';
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

  toggleOpen() {
    if (this._$element.hasClass(`${this._className}_opened`)) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this._isOpened = true;
    this._$element.addClass(`${this._className}_opened`);
    this._dropDownSummary.open();
  }

  close() {
    this._isOpened = false;
    this._$element.removeClass(`${this._className}_opened`);
    this._dropDownSummary.close();
  }

  _init() {
    const { dropdown = {}, items, control } = this._props;
    const { isOpened, type, map, together, placeholder } = dropdown;
    this._isOpened = isOpened;
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
      parent: $(`${this._query}__dropdown-summary`, this._$element),
      props: {
        ...this._props,
        items,
        type,
        map,
        together,
        placeholder,
        handleEmptySummary: this._hideCleanButton,
        handleFillSummary: this._showCleanButton,
        handleTitleClick: this._handleDropdownTitleTextFieldClick,
        handleTextFieldClick: this._handleDropdownTitleTextFieldClick,
      },
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
    if (Dropdown.CONTROLS[type]) {
      this[Dropdown.CONTROLS[type]]();
    }
  }

  @bind
  _handleDropdownTitleTextFieldClick() {
    this.toggleOpen();
  }

  @bind
  _renderItem(index, element) {
    const props = this._props?.items?.[index];
    const item = new DropdownItem({
      parent: element,
      props: { ...props, handleInputChange: this._handleInputChange },
    });
    this._items.push(item);
  }

  @bind
  _handleInputChange(item) {
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
    this.close();
  }

  @bind
  _hideCleanButton() {
    this._control?.hide();
  }

  @bind
  _showCleanButton() {
    this._control?.show();
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
}

export default Dropdown;
