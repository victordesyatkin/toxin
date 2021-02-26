import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './pagination.scss';

class Pagination extends Component {
  static TYPE_BACK = 'back';

  static TYPE_NEXT = 'next';

  _query = '.js-pagination';

  _className = 'pagination';

  static isCurrentStartOrEnd({ direction, start, current, end }) {
    return (
      (direction === 'prev' && start === current) ||
      (direction === 'next' && end === current)
    );
  }

  static isRenderText({ text, count, current, end }) {
    return (
      text &&
      typeof text === 'string' &&
      text.trim().length &&
      count &&
      current &&
      end
    );
  }

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const {
      start = 0,
      end = 0,
      current,
      isPreventDefault = true,
      isDisabled,
      limit = 0,
      separatorItem,
    } = this._props;
    if (start > 0 && end > 0) {
      this._current = current;
      this._isPreventDefault = isPreventDefault;
      this._isDisabled = isDisabled;
      this._limit = limit;
      this._start = start;
      this._end = end;
      this._separatorItem = separatorItem;
      this._$items = $(`${this._query}__items`, this._$element);
      this._updateListItems();
    }
  }

  _updateListItems() {
    this._$items.empty();
    this._createListItemControlBack();
    this._createListItemFirst();
    this._createListItemFirstSeparator();
    this._createListItemBody();
    this._createListItemLastSeparator();
    this._createListItemLast();
    this._createListItemControlNext();
  }

  _createListItemControlNext() {
    if (this._end - this._current > this.limit) {
      const value = this._current + 1;
      this._createListItem({
        data: {
          value,
        },
        className: `${this._className}__item_control ${this._className}__item_control_next`,
        link: {
          value,
          content: this._createImage({ type: Pagination.NEXT }),
        },
      });
    }
  }

  _createListItemBody() {
    let start = this._current - this.limit;
    start = start < this._start ? this._start : start;
    let end = this._current + this.limit;
    end = end > this._end ? this._end : end;
    for (let i = start; i <= end; i += 1) {
      this._createListItem({
        data: {
          value: i,
        },
        className:
          i === this._current ? `${this._className}__item_current` : '',
        link: {
          value: i,
          text: i,
        },
      });
    }
  }

  _createListItemFirstSeparator() {
    if (this._current - this.limit - this._start > 1) {
      this._createListItem({
        className: `${this._className}__item_separator`,
        link: {
          text: this._separatorItem,
        },
      });
    }
  }

  _createListItemLastSeparator() {
    if (this._end - this._current - this.limit > 1) {
      this._createListItem({
        className: `${this._className}__item_separator`,
        link: {
          text: this._separatorItem,
        },
      });
    }
  }

  _createListItemLast() {
    if (this._end > this._current + this.limit) {
      this._createListItem({
        data: {
          value: this._end,
        },
        link: {
          value: this._end,
          text: this._end,
        },
      });
    }
  }

  _createListItemFirst() {
    if (this._Start < this._current - this.limit) {
      this._createListItem({
        data: {
          value: this._Start,
        },
        link: {
          value: this._Start,
          text: this._Start,
        },
      });
    }
  }

  _createListItemControlBack() {
    if (this._current - this._start > this.limit) {
      const value = this._current - 1;
      this._createListItem({
        data: {
          value,
        },
        className: `${this._className}__item_control ${this._className}__item_control_back`,
        link: {
          value,
          content: this._createImage({ type: Pagination.BACK }),
        },
      });
    }
  }

  _createListItem({ className: passClassName, link, data }) {
    let className = `${this._className}__item`;
    className += passClassName ? ` ${passClassName}` : '';
    const $item = $('<li/>', {
      class: className,
      on: {
        click: this._handleListItemClick,
      },
      append: this._createLink(link),
    });
    $item.data(data);
    $item.appendTo(this._$items);
  }

  _createLink(link) {
    const { className: passClassName, text, content, value } = link;
    let className = `${this._className}__link`;
    className += passClassName ? ` ${passClassName}` : '';
    const { to = {} } = this._props;
    const { pathname = '', search = '', title = '' } = to;
    const $link = $('<a>', {
      class: className,
      href: value ? `${pathname}?${search}=${value}` : '',
      title,
      text,
      append: content,
    });
    return $link;
  }

  _createImage({ type }) {
    const { srcControl, altBack, altNext } = this._props;
    const alt = type === Pagination.NEXT ? altNext : altBack;
    return $('<img/>', {
      src: srcControl,
      alt,
      title: alt,
    });
  }

  @bind
  _handleListItemClick(event) {
    if (!this._isDisabled) {
      if (this._isPreventDefault) {
        event.preventDefault();
      }
      const { currentTarget } = event;
      const { value } = $(currentTarget, this._$element).data();
      if (value && this._current !== value) {
        this._current = value;
        this._updateListItems();
      }
      const { handleListItemClick, to } = this._props;
      if (handleListItemClick) {
        handleListItemClick({ to, value });
      }
    }
  }

  _attachEventHandler() {
    if (this._element && this._element.addEventListener) {
      this._element.addEventListener('click', this._handlePaginationClick);
    }
  }

  _isCurrent(item) {
    return this._element.dataset.current && item && parseFloat(item);
  }

  @bind
  _handlePaginationClick(event) {
    let target = (event || {}).target || {};
    if (target.closest('div[data-direction]')) {
      target = target.closest('div[data-direction]');
    } else if (target.closest('div[data-item]')) {
      target = target.closest('div[data-item]');
    }
    const { current, direction, item } = target.dataset || {};
    if (parseFloat(current)) {
      return null;
    }
    if (this._isCurrent(item)) {
      this._element.dataset.current = parseFloat(item);
    } else if (direction === 'next') {
      this._element.dataset.current =
        parseFloat(this._element.dataset.current) + 1;
    } else if (direction === 'prev') {
      this._element.dataset.current =
        parseFloat(this._element.dataset.current) - 1;
    }
    this._renderCommon();
    this._renderText();
    return undefined;
  }

  _setAttributeDirection = (direction) => {
    const { start, end, current } = this._element.dataset;
    let hidden = false;
    if (Pagination.isCurrentStartOrEnd({ direction, current, end, start })) {
      hidden = true;
    }
    const element = this._element.querySelector(
      `[data-direction="${direction}"]`
    );
    if (element) {
      element.classList.toggle('pagination_hidden', hidden);
    }
  };

  _renderText = () => {
    let { end, current, text, count } = this._props;
    end = parseFloat(end);
    current = parseFloat(current);
    count = parseFloat(count);
    if (Pagination.isRenderText({ text, count, current, end })) {
      const startText =
        (current - 1) * count > 0 ? (current - 1) * count : current;
      const endText = current * count > 0 ? current * count : current;
      const total = end * count > 100 ? '100+' : end * count;
      text = `${startText} - ${endText} из ${total} ${text}`;
      const element = document.querySelector('.pagination__section-footer');
      if (element) {
        element.innerHTML = text;
      }
    }
  };

  _renderCommon = () => {
    let { start, end, current, limit } = this._props;
    start = parseFloat(start);
    end = parseFloat(end);
    current = parseFloat(current);
    limit = parseFloat(limit);
    this._setAttributeDirection('prev');
    this._setAttributeDirection('next');
    const emptyString = '...';
    const pages = [];
    if (current - start > limit) {
      pages.push(start);
    }
    if (current - start > limit + 1) {
      pages.push(emptyString);
    }
    for (let i = current - limit; i <= current + limit; i += 1) {
      if (!(i < start && i > end)) {
        pages.push(i);
      }
    }
    if (end - current > limit + 1) {
      pages.push(emptyString);
    }
    if (end - current > limit) {
      pages.push(end);
    }
    const prev = this._element.querySelector('[data-direction="prev"]');
    const next = this._element.querySelector('[data-direction="next"]');
    const body = this._element.querySelector('.js-pagination__section-body');
    body.innerHTML = '';
    const fragment = document.createDocumentFragment();
    fragment.appendChild(prev);
    pages.forEach((page) => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('pagination__item');

      const newDivDummy = document.createElement('div');
      newDivDummy.classList.add('pagination__dummy');
      newDiv.appendChild(newDivDummy);

      const newDivContent = document.createElement('div');
      newDivContent.classList.add('pagination__content');
      newDiv.appendChild(newDivContent);

      const newContent = document.createTextNode(page);
      newDivContent.appendChild(newContent);
      let dataCurrent = 0;
      if (page === emptyString) {
        newDiv.classList.add('pagination__item_empty');
      } else if (page === current) {
        newDiv.classList.add('pagination__item_current');
        dataCurrent = 1;
      }
      newDiv.dataset.current = dataCurrent;
      newDiv.dataset.item = page;
      fragment.appendChild(newDiv);
    });
    fragment.appendChild(next);
    body.appendChild(fragment);
  };
}

export default Pagination;
