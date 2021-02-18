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
    // console.log('Component constructor : ', options);
    // console.log('Component constructor this._query : ', this._query);
    // console.log('Component constructor this.this : ', this);
    this._options = options;
    const { props, parent } = this._options;
    this._parent = parent;
    this._props = props;
  }

  _isValidQuery() {
    return this._query && isString(this._query) && trim(this._query);
  }

  @bind
  _renderComponent() {
    const { query } = this._options;
    this._query = query || this._query;
    // console.log('Component _renderComponent this._query : ', this._query);
    if (!this._isValidQuery()) {
      return undefined;
    }
    const $element = $(this._query, this._parent);
    if (!$element.length) {
      return undefined;
    }
    const element = $element.get(0);
    if (!element) {
      return undefined;
    }
    this._element = element;
    this._$element = $(element);
    // console.log(
    //   'Component _renderComponent $element : ',
    //   this.$element.data(this.constructor.name)
    // );
    // console.log(
    //   'Component _renderComponent this.name : ',
    //   this.constructor.name
    // );
    if (this._$element.data(this.constructor.name)) {
      return undefined;
    }
    this._$element.data(this.constructor.name, this);
    // console.log('Component  _renderComponent this._init : ', this._init);
    if (this._init) {
      this._init();
    }
    return undefined;
  }
}

export { wordForm, renderComponents, renderComponent, Component };
