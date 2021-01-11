import Picker from "../../components/picker";
import SignUp from "../../components/sign-up";
import SignIn from "../../components/sign-in";
import Calendar from "../../components/calendar";
import CardSlider from "../../components/card-slider";

import "./cards.scss";

function renderComponents() {
  Picker.renderComponents({ parents: ".js-cards__picker" });
  SignUp.renderComponents({ parents: ".js-cards__sign-up" });
  SignIn.renderComponents({ parents: ".js-cards__sign-in" });
  Calendar.renderComponents({ parents: ".js-cards__calendar" });
  CardSlider.renderComponents({ parents: ".js-cards__card-slider" });
}

document.addEventListener("DOMContentLoaded", renderComponents);
