import { Component } from '../../helpers/utils';
import DateDropdown from '../date-dropdown';
import Dropdown from '../dropdown';
import '../button';
import './picker.scss';

class Picker extends Component {
  _query = '.js-picker';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    console.log('this._init props : ', this._props);
    const { dateDropdown, dropdown } = this._props;
    this._dateDropdown = new DateDropdown({
      parent: $(`${this._query}__date-dropdown`, this._$element),
      props: dateDropdown,
    });
    this._dropDown = new Dropdown({
      parent: $(`${this._query}__dropdown`, this._$element),
      props: dropdown,
    });
  }
}

export default Picker;
