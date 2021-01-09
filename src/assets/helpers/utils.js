import isString from "lodash/isString";
import isArray from "lodash/isArray";
import trim from "lodash/trim";
import isFunction from "lodash/isFunction";
import isEmpty from "lodash/isEmpty";

function wordForm(num, word) {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
}

function renderComponents(props = {}) {
  const { query, render } = props;
  let { parents } = props;
  if (!query) {
    return;
  }
  if (isString(query) && !trim(query)) {
    return;
  }
  if (!render || !isFunction(render)) {
    return;
  }
  if (!parents || !isArray(parents)) {
    parents = [parents];
  } else if (isEmpty(parents)) {
    parents = [undefined];
  }
  for (const parent of parents) {
    $(query, parent).each(render);
  }
}

export { wordForm, renderComponents };
