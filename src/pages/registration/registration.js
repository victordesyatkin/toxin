import { renderComponents } from "../../assets/helpers/utils";

import Picker from "../../components/picker";
import Footer from "../../components/footer";

import "./registration.scss";
export default class Registration {
  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-registration",
      render: render || Registration._renderComponent,
    });
  }

  static _renderComponent() {
    new Registration(arguments[1]);
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    Picker.renderComponents({ parents: this._$element });
  }
}

function renderComponent() {
  Registration.renderComponents();
}
