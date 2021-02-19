import { Component } from '../../helpers/utils';
import TextField from '../../components/text-field';
import Dropdown from '../../components/dropdown';
// import MaskTextField from '../../components/masked-text-field';
// import DateDropdown from '../../components/date-dropdown';
// import FilterDateDropdown from '../../components/filter-date-dropdown';
// import SubscriptionTextField from '../../components/subscription-text-field';
// import ExpandableCheckboxList from '../../components/expandable-checkbox-list';
// import LikeButtons from '../../components/like-buttons';
// import RateButtons from '../../components/rate-buttons';
// import RangeSlider from '../../components/range-slider';
// import Pagination from '../../components/pagination';
// import Comment from '../../components/comment';
import '../../components/checkbox-buttons';
import '../../components/toggle-buttons';
import '../../components/radio-buttons';
import '../../components/rich-checkbox-buttons';
import '../../components/bullet-list';
import '../../components/info';
import '../../components/buttons';
import '../demo-base/demo-base';
import './form-elements.scss';
import data from './data.json';

class FormElements extends Component {
  _query = '.js-form-elements';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const { textField1, textField2, dropdown1 } = this._props;
    console.log('props : ', this._props);
    this._input1 = new TextField({
      parent: $(`${this._query}__text-field-default`, this._$element),
      props: textField1,
    });
    this._input2 = new TextField({
      parent: $(`${this._query}__text-field-hover-focus`, this._$element),
      props: textField2,
    });
    this._dropdown1 = new Dropdown({
      parent: $(`${this._query}__dropdown-first`, this._$element),
      props: dropdown1,
    });
    // Dropdown.renderComponents({ parents });
    // MaskTextField.renderComponents({
    //   parents,
    // });
    // DateDropdown.renderComponents({
    //   parents,
    // });
    // FilterDateDropdown.renderComponents({
    //   parents,
    // });
    // SubscriptionTextField.renderComponents({
    //   parents,
    // });
    // ExpandableCheckboxList.renderComponents({
    //   parents,
    // });
    // LikeButtons.renderComponents({
    //   parents,
    // });
    // RateButtons.renderComponents({
    //   parents,
    // });
    // Pagination.renderComponents({ parents });
    // RangeSlider.renderComponents({
    //   parents,
    // });
    // Comment.renderComponents({ parents });
  }
}

function handleComponentLoad() {
  const cards = new FormElements({ props: data });
  return cards;
}

window.addEventListener('load', handleComponentLoad);

export default FormElements;
