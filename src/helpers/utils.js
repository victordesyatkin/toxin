import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import trim from 'lodash/trim';
import isFunction from 'lodash/isFunction';
import isEmpty from 'lodash/isEmpty';
import bind from 'bind-decorator';

function wordForm(num, word) {
  const cases = [2, 0, 1, 1, 1, 2];
  return word[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
}

function renderComponents(options = {}) {
  const { query, render, props } = options;
  let { parents } = options;
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
    (accumulator, parent) =>
      accumulator.push(
        $(query, parent).each((index, element) => {
          render({ props, element });
        })
      ),
    []
  );
}

function isRenderComponent({ element, SomeClass }) {
  return element && SomeClass.CLASS_NAME && SomeClass;
}

function renderComponent(options = {}) {
  const { element, SomeClass, props } = options;
  if (!isRenderComponent(options)) {
    return undefined;
  }
  const $element = $(element);
  if ($element.data(SomeClass.CLASS_NAME)) {
    return undefined;
  }
  return $element.data(SomeClass.name, new SomeClass({ element, props }));
}

class Component {
  constructor(options = {}) {
    const { props } = options;
    this._props = props;
    this._parents = this._renderComponents(options);
    if (this._init) {
      this._init();
    }
  }

  _renderComponents(options = {}) {
    const { query, props } = options;
    this._query = query || this._query;
    let { parents } = options;
    if (!this._query) {
      return undefined;
    }
    if (isString(this._query) && !trim(this._query)) {
      return undefined;
    }
    if (!parents || !isArray(parents)) {
      parents = [parents];
    } else if (isEmpty(parents)) {
      parents = [undefined];
    }
    return parents.reduce(
      (accumulator, parent) =>
        accumulator.push(
          $(this._query, parent).each((index, element) => {
            this._renderComponent({ props, element });
          })
        ),
      []
    );
  }

  @bind
  _renderComponent(options = {}) {
    const { element } = options;
    if (!element) {
      return undefined;
    }
    this.element = element;
    this.$element = $(element);
    if (this.$element.data(this.name)) {
      return undefined;
    }
    return this.$element.data(this.name, this);
  }
}

export { wordForm, renderComponents, renderComponent, Component };
