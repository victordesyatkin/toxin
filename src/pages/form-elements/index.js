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

import "./form-elements.scss";

function renderComponents() {
  Input.renderComponents(".js-form-elements__input");
  Dropdown.renderComponents(".js-form-elements__dropdown");
  MaskTextField.renderComponents(".js-form-elements__masked-text-field");
  DateDropdown.renderComponents(".js-form-elements__date-dropdown");
  FilterDateDropdown.renderComponents(
    ".js-form-elements__filter-date-dropdown"
  );
  SubscriptionTextField.renderComponents(
    ".js-form-elements__subscription-text-field"
  );
  ExpandableCheckboxList.renderComponents(
    ".js-form-elements__expandable-checkbox-list"
  );
  LikeButtons.renderComponents(".js-form-elements__like-buttons");
  RateButtons.renderComponents(".js-form-elements__rate-buttons");
  Pagination.renderComponents(".js-form-elements__pagination");
  RangeSlider.renderComponents(".js-form-elements__range-slider");
  Comment.renderComponents(".js-form-elements__comment");
}

document.addEventListener("DOMContentLoaded", renderComponents);
