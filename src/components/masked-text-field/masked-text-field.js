import IMask from "imask";

import "./masked-text-field.scss";

export default function renderComponent() {
  $(".js-masked-text-field").each(function () {
    const selector = $("input", this);
    let maskOptions = selector.data("mask") || {
      mask: Date,
      lazy: false,
      overwrite: true,
      autofix: true,
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

document.addEventListener("DOMContentLoaded", renderComponent);
