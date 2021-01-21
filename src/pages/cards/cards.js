import { renderComponent, renderComponents } from "../../assets/helpers/utils";
import Picker from "../../components/picker";
import SignUp from "../../components/sign-up";
import SignIn from "../../components/sign-in";
import Calendar from "../../components/calendar";
import CardSlider from "../../components/card-slider";
import Book from "../../components/book";
import "../../components/card";
import "../../index";
import "../demo-base/demo-base";
import "./cards.scss";

class Cards {
  static CLASS_NAME = "CARDS";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-cards",
      render: render || Cards._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
      className: Cards.CLASS_NAME,
      someClass: Cards,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    const parents = this._$element;
    Picker.renderComponents({ parents });
    Book.renderComponents({ parents });
    SignUp.renderComponents({ parents });
    SignIn.renderComponents({ parents });
    Calendar.renderComponents({ parents });
    CardSlider.renderComponents({ parents });
  }
}

window.addEventListener("load", Cards.renderComponents);

export default Cards;
