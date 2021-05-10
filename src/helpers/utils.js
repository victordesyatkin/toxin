import bind from 'bind-decorator';
import trim from 'lodash.trim';
import isEmpty from 'lodash.isempty';

function isString(str) {
  if (str && typeof str.valueOf() === 'string') {
    return true;
  }
  return false;
}

function isUndefined(value) {
  return typeof value === 'undefined' && value === undefined;
}

function isFunction(func) {
  if (func) {
    const isFunc =
      {}.toString.call(func) === '[object Function]' &&
      typeof func === 'function';
    if (isFunc) {
      return true;
    }
  }
  return false;
}

function wordForm(number = 0, words = []) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

function toggleHeight($element) {
  const clientHeight = parseFloat($element.prop('clientHeight'), 10);
  const scrollHeight = parseFloat($element.prop('scrollHeight'), 10);
  if (clientHeight > 0) {
    $element.css('height', 0);
  } else {
    $element.css('height', scrollHeight);
  }
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
  if (!parents || !Array.isArray(parents)) {
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

function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function uuid() {
  return Math.random().toString(16).slice(2);
}

const cache = {};

function requireAll(requireContext) {
  requireContext.keys().forEach((key) => {
    cache[key] = requireContext(key);
    return cache;
  });
}

function checkSlug({ slug } = {}) {
  if (slug) {
    return $('body').data('slug') === slug;
  }
  return false;
}

function isConstructor(Component) {
  return !!Component.prototype && !!Component.prototype.constructor.name;
}

function makeComponentLoadHandler(Component) {
  return function handleComponentLoad(event) {
    let component;
    if (Component && isConstructor(Component)) {
      const { data: { props = {} } = {} } = event;
      if (checkSlug(props)) {
        component = new Component({ props });
      }
    }
    return component;
  };
}

function isValidDateByParts({ partDay, partMonth, partYear }) {
  return partDay && partMonth && partYear;
}

function prepareDate(passDate = '') {
  let date = '';
  if (passDate && isString(passDate)) {
    const [partDay, partMonth, partYear] = passDate.split('.');
    if (isValidDateByParts({ partDay, partMonth, partYear })) {
      date = new Date(`${partMonth}.${partDay}.${partYear}`);
      if (!isValidDate(date)) {
        date = '';
      }
    }
  }
  return date;
}

function value2Date(value = '') {
  let date = new Date(value);
  if (!isValidDate(date)) {
    date = prepareDate(value);
  }
  return date;
}

function transformNumber({ number = 0, numberFormat = {} }) {
  const { locales, options } = numberFormat || {};
  return new Intl.NumberFormat(locales, options).format(number);
}

function prepareNumber(number = '') {
  return (number || '').replace(/\s/g, '').split(' ').join('') || 0;
}

function deepCheckerOutsideClick({ event, isOpened, callback, $parent }) {
  if (isOpened && $parent) {
    const { target } = event;
    const path = event?.originalEvent?.path || [];
    let isClosest = false;
    path.forEach((item) => {
      if (!isClosest) {
        isClosest = $(item).closest($parent).length;
      }
    });
    const isClickOutside = !$(target).closest($parent).length && !isClosest;
    if (isClickOutside) {
      if (isFunction(callback)) {
        callback();
      }
      return true;
    }
    return false;
  }
  return false;
}

function checkerOutsideClick({ event, isOpened, callback, $parent }) {
  if (isOpened && $parent) {
    const { target } = event;
    const isClickOutside = !$(target).closest($parent).length;
    if (isClickOutside) {
      if (isFunction(callback)) {
        callback();
      }
      return true;
    }
    return false;
  }
  return false;
}
class Component {
  constructor(options = {}) {
    this._options = options;
    const { props = {}, parent } = this._options;
    this._parent = parent;
    this._props = props;
  }

  _isValidQuery() {
    return this._query && isString(this._query) && trim(this._query);
  }

  @bind
  getElement() {
    return this._element;
  }

  @bind
  _renderComponent() {
    const { query, className } = this._options;
    this._query = query || this._query;
    this._className = className || this._className;
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
    if (this._$element.data(this.constructor.name)) {
      return undefined;
    }
    this._$element.data(this.constructor.name, this);
    if (this._init) {
      this._init();
    }
    return undefined;
  }
}

export {
  Component,
  wordForm,
  renderComponents,
  renderComponent,
  toggleHeight,
  isValidDate,
  uuid,
  requireAll,
  isString,
  isUndefined,
  checkSlug,
  makeComponentLoadHandler,
  value2Date,
  prepareDate,
  isValidDateByParts,
  transformNumber,
  prepareNumber,
  checkerOutsideClick,
  deepCheckerOutsideClick,
};
