import { Component } from '../../helpers/utils';
import DateDropdown from '../date-dropdown';
import Dropdown from '../dropdown';
import '../button';
import './picker.scss';

class Picker extends Component {
  _query = '.js-picker';

  _init() {
    const { dateDropdown, dropDown } = this._props;
    this._dateDropdown = new DateDropdown({
      parents: this._$element,
      props: dateDropdown,
    });
    this._dropDown = new Dropdown({ parents: this._$element, props: dropDown });
  }
}

export default Picker;
