/* eslint comma-dangle: ["error", {"functions": "never"}] */
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import trim from 'lodash/trim';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';

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
    return undefined;
  }
  if (isString(query) && !trim(query)) {
    return undefined;
  }
  if (!render || !isFunction(render)) {
    return undefined;
  }
  if (!parents || !isArray(parents)) {
    parents = [parents];
  } else if (isEmpty(parents)) {
    parents = [undefined];
  }
  return parents.reduce(
    (accumulator, parent) => accumulator.push($(query, parent).each(render)),
    []
  );
}

function isRenderComponent({ element, className, SomeClass }) {
  return !element || !className || !SomeClass;
}

function renderComponent(options = {}) {
  const { element, className, SomeClass } = options;
  if (!isRenderComponent(options)) {
    return undefined;
  }
  const $element = $(element);
  if ($element.data(className)) {
    return undefined;
  }
  return $element.data(className, new SomeClass(element));
}

export { wordForm, renderComponents, renderComponent };
