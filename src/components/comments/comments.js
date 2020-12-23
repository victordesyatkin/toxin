import get from "lodash/get";

import("./comments.scss");

function wordForm(num, word) {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
}

function renderComponent() {
  $(".js-comments").each(function () {
    const data = $(this).data();
    const units = get(data, ["units"]) || [];
    const count = get(data, ["count"]) || [];
    const $units = $(".js-comments__count-units", this);
    if (units.length) {
      $units.html(wordForm(count, units));
    }
  });
}

document.addEventListener("DOMContentLoaded", renderComponent);
