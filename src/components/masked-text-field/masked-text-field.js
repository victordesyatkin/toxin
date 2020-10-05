//import Inputmask from "inputmask";
import IMask from "imask";
import "./masked-text-field.scss";

export default function renderComponent() {
  $(".masked-text-field").each(function () {
    const selector = $("input", this);
    // const placeholder = selector.attr("placeholder") || "*";
    // let maskOptions = selector.data("mask") || {
    //   alias: "datetime",
    //   inputFormat: "dd.mm.yyyy",
    //   placeholder,
    //   greedy: false,
    // };
    // const im = new Inputmask(maskOptions);
    // im.mask(selector);
    let maskOptions = selector.data("mask") || {
      mask: Date,
      lazy: false,
      overwrite: true,
      autofix: true,
      // min: new Date(new Date().getFullYear(), 0, 1),
      // max: new Date(new Date().getFullYear() + 2, 0, 1),
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          placeholderChar: "Д",
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          placeholderChar: "М",
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          placeholderChar: "Г",
          from: 1999,
          to: 2999,
          maxLength: 4,
        },
      },
    };
    const im = IMask(selector.get(0), maskOptions);
  });
}

renderComponent();
