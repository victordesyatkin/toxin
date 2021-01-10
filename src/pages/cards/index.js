import Picker from "../../components/picker";

import "./cards.scss";

function renderComponents() {
  Picker.renderComponents(".js-cards__picker");
}

document.addEventListener("DOMContentLoaded", renderComponents);
