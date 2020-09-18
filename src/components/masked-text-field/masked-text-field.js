import Inputmask from "inputmask";
import "./masked-text-field.scss";

export default function renderComponent() {
  $(".masked-text-field").each(function () {
    const selector = $("input", this);
    let mask = selector.data("mask") || {
      alias: "datetime",
      inputFormat: "dd.mm.yyyy",
      placeholder: placeholder,
    };
    const placeholder = selector.attr("placeholder") || "*";
    const im = new Inputmask(mask);
    im.mask(selector);
  });
}

renderComponent();
