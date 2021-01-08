import Input from "../../components/input/input";
import Dropdown from "../../components/dropdown/dropdown";
import MaskTextField from "../../components/masked-text-field/masked-text-field";
import DateDropdown from "../../components/date-dropdown/date-dropdown";

import "./form-elements.scss";

function renderComponents() {
  Input.renderComponents(".form-elements__input");
  Dropdown.renderComponents();
  MaskTextField.renderComponents();
  DateDropdown.renderComponents();
}

document.addEventListener("DOMContentLoaded", renderComponents);
