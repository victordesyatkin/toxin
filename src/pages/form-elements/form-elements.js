import { Component } from '../../helpers/utils';
import TextField from '../../components/text-field';
import Dropdown from '../../components/dropdown';
import MaskedTextField from '../../components/masked-text-field';
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
    const { textField1, textField2, dropdown1, maskedTextField } = this._props;
    console.log('props : ', this._props);
    this._textField1 = new TextField({
      parent: $(`${this._query}__text-field-default`, this._$element),
      props: textField1,
    });
    this._textField2 = new TextField({
      parent: $(`${this._query}__text-field-hover-focus`, this._$element),
      props: textField2,
    });
    this._dropdown1 = new Dropdown({
      parent: $(`${this._query}__dropdown-first`, this._$element),
      props: dropdown1,
    });
    // //console.log(
    //   '$(`${this._query}__masked-text-field`, this._$element : ',
    //   $(`${this._query}__masked-text-field`, this._$element)
    // );
    this._maskedTextField = new MaskedTextField({
      parent: $(`${this._query}__masked-text-field`, this._$element),
      props: maskedTextField,
    });
    this._maskedTextField = new MaskedTextField({
      parent: $(`${this._query}__masked-text-field`, this._$element),
      props: maskedTextField,
    });
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
