import { renderComponents, renderComponent } from "../../assets/helpers/utils";
import Input from "../../components/input";
import Dropdown from "../../components/dropdown";
import MaskTextField from "../../components/masked-text-field";
import DateDropdown from "../../components/date-dropdown";
import FilterDateDropdown from "../../components/filter-date-dropdown";
import SubscriptionTextField from "../../components/subscription-text-field";
import ExpandableCheckboxList from "../../components/expandable-checkbox-list";
import LikeButtons from "../../components/like-buttons";
import RateButtons from "../../components/rate-buttons";
import RangeSlider from "../../components/range-slider";
import Pagination from "../../components/pagination";
import Comment from "../../components/comment";
import "../../components/input";
import "../../components/checkbox-buttons";
import "../../components/toggle-buttons";
import "../../components/radio-buttons";
import "../../components/rich-checkbox-buttons";
import "../../components/bullet-list";
import "../../components/info";
import "../demo-base/demo-base";
import "./form-elements.scss";
class FormElements {
  static CLASS_NAME = "FORM_ELEMENTS";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-form-elements",
      render: render || FormElements._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: FormElements.CLASS_NAME,
      someClass: FormElements,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    const parents = this._$element;
    Input.renderComponents({ parents });
    Dropdown.renderComponents({ parents });
    MaskTextField.renderComponents({
      parents,
    });
    DateDropdown.renderComponents({
      parents,
    });
    FilterDateDropdown.renderComponents({
      parents,
    });
    SubscriptionTextField.renderComponents({
      parents,
    });
    ExpandableCheckboxList.renderComponents({
      parents,
    });
    LikeButtons.renderComponents({
      parents,
    });
    RateButtons.renderComponents({
      parents,
    });
    Pagination.renderComponents({ parents });
    RangeSlider.renderComponents({
      parents,
    });
    Comment.renderComponents({ parents });
  }
}

window.addEventListener("load", FormElements.renderComponents);

export default FormElements;
