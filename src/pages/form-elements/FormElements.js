import { Component } from '../../helpers';
import TextField from '../../components/text-field';
import Dropdown from '../../components/dropdown';
import MaskedTextField from '../../components/masked-text-field';
import DateDropdown from '../../components/date-dropdown';
import FilterDateDropdown from '../../components/filter-date-dropdown';
import SubscriptionTextField from '../../components/subscription-text-field';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list';
import LikeButtons from '../../components/like-buttons';
import RateButtons from '../../components/rate-buttons';
import RangeSlider from '../../components/range-slider';
import Pagination from '../../components/pagination';
import Comment from '../../components/comment';

class FormElements extends Component {
  _query = '.js-form-elements';

  _className = 'form-elements';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const {
      textField1,
      textField2,
      dropdown1,
      maskedTextField,
      dateDropdown,
      filterDateDropdown,
      subscriptionTextField,
      likeButtons,
      rateButtons,
      rangeSlider,
      pagination,
      dropdown2,
      dropdown3,
      dropdown4,
      dropdown5,
      expandableCheckboxList1,
      expandableCheckboxList2,
      comment,
    } = this._props;
    this._textField1 = new MaskedTextField({
      parent: $(`${this._query}__text-field-default`, this._$element),
      props: textField1,
    });
    this._textField2 = new TextField({
      parent: $(`${this._query}__text-field-hover-focus`, this._$element),
      props: textField2,
    });
    this._dropdown1 = new Dropdown({
      parent: $(`${this._query}__dropdown-guest-empty`, this._$element),
      props: dropdown1,
    });
    this._maskedTextField = new MaskedTextField({
      parent: $(`${this._query}__masked-text-field`, this._$element),
      props: maskedTextField,
    });
    this._dateDropdown = new DateDropdown({
      parent: $(`${this._query}__date-dropdown`, this._$element),
      props: dateDropdown,
    });
    this._filterDateDropdown = new FilterDateDropdown({
      parent: $(`${this._query}__filter-date-dropdown`, this._$element),
      props: filterDateDropdown,
    });
    this._subscriptionTextField = new SubscriptionTextField({
      parent: $(`${this._query}__subscription-text-field`, this._$element),
      props: subscriptionTextField,
    });
    this._likeButtons = new LikeButtons({
      parent: $(`${this._query}__like-buttons`, this._$element),
      props: likeButtons,
    });
    this._rateButtons = new RateButtons({
      parent: $(`${this._query}__rate-buttons`, this._$element),
      props: rateButtons,
    });
    this._rangeSlider = new RangeSlider({
      parent: $(`${this._query}__range-slider`, this._$element),
      props: rangeSlider,
    });
    this._pagination = new Pagination({
      parent: $(`${this._query}__pagination`, this._$element),
      props: pagination,
    });
    this._dropdown2 = new Dropdown({
      parent: $(`${this._query}__dropdown-comfort-default`, this._$element),
      props: dropdown2,
    });
    this._dropdown3 = new Dropdown({
      parent: $(`${this._query}__dropdown-comfort-expanded`, this._$element),
      props: dropdown3,
    });
    this._dropdown4 = new Dropdown({
      parent: $(
        `${this._query}__dropdown-guests-empty-expended`,
        this._$element
      ),
      props: dropdown4,
    });
    this._dropdown5 = new Dropdown({
      parent: $(`${this._query}__dropdown-guests-expended`, this._$element),
      props: dropdown5,
    });
    this._expandableCheckboxList1 = new ExpandableCheckboxList({
      parent: $(`${this._query}__expandable-checkbox-list`, this._$element),
      props: expandableCheckboxList1,
    });
    this._expandableCheckboxList1 = new ExpandableCheckboxList({
      parent: $(
        `${this._query}__expandable-checkbox-list-expended`,
        this._$element
      ),
      props: expandableCheckboxList2,
    });
    this._comment = new Comment({
      parent: $(`${this._query}__comment`, this._$element),
      props: comment,
    });
  }
}

export default FormElements;
