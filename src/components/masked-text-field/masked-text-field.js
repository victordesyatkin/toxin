import Inputmask from "inputmask";
import "./masked-text-field.scss";

export default function renderComponent() {
  $(".masked-text-field").each(function () {
    const selector = $("input", this);
    const placeholder = $(selector).attr("placeholder") || "*";
    const im = new Inputmask({
      alias: "datetime",
      inputFormat: "dd.mm.yyyy",
      placeholder: placeholder,
    });
    im.mask(selector);
  });
}

renderComponent();
