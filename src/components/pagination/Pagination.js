import bind from 'bind-decorator';

import { Component, requireAll } from '../../helpers/utils';
import './pagination.scss';

requireAll(require.context('./images/', false, /\.svg$/));
class Pagination extends Component {
  static TYPE_BACK = 'back';

  static TYPE_NEXT = 'next';

  _query = '.js-pagination';

  _className = 'pagination';

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
      description,
      separatorDescription,
      separatorTotal,
      count,
    } = this._props;
    if (start > 0 && end > 0) {
      this._current = current;
      this._count = count;
      this._isPreventDefault = isPreventDefault;
      this._isDisabled = isDisabled;
      this._limit = limit;
      this._start = start;
      this._end = end;
      this._separatorItem = separatorItem;
      this._description = description;
      this._separatorDescription = separatorDescription;
      this._separatorTotal = separatorTotal;
      this._$items = $(`${this._query}__items`, this._$element);
      this._$summary = $(`${this._query}__summary`, this._$element);
      $(window).on('resize', this._handleWindowResize);
      this._updateListItems();
    }
  }

  _updateListItems() {
    this._$dummy = $(document.createDocumentFragment());
    this._correctLimit();
    this._createListItemControlBack();
    this._createListItemFirst();
    this._createListItemFirstSeparator();
    this._createListItemBody();
    this._createListItemLastSeparator();
    this._createListItemLast();
    this._createListItemControlNext();
    this._updateSummary();
    this._$items.empty().append(this._$dummy);
    this._$dummy = undefined;
  }

  _correctLimit() {
    const widthBody = parseFloat($('body').css('width'), 10) || 0;
    if (widthBody < 400) {
      this._limit = 0;
    } else {
      const { limit } = this._props;
      this._limit = limit;
    }
  }

  _updateSummary() {
    if (this._description && this._count) {
      let start = (this._current - 1) * this._count;
      start = start || this._start;
      const end = this._current * this._count;
      let total = this._end * this._count;
      total = total > 100 ? '100+' : total;
      const summary = `${start} ${this._separatorDescription} ${end} ${this._separatorTotal} ${total} ${this._description}`;
      this._$summary.html(summary);
    }
  }

  _createListItemControlNext() {
    if (this._end - this._current > this._limit) {
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
    let start = this._current - this._limit;
    start = start < this._start ? this._start : start;
    let end = this._current + this._limit;
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
    if (this._current - this._limit - this._start > 1) {
      this._createListItem({
        className: `${this._className}__item_separator`,
        link: {
          text: this._separatorItem,
        },
      });
    }
  }

  _createListItemLastSeparator() {
    if (this._end - this._current - this._limit > 1) {
      this._createListItem({
        className: `${this._className}__item_separator`,
        link: {
          text: this._separatorItem,
        },
      });
    }
  }

  _createListItemLast() {
    if (this._end > this._current + this._limit) {
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
    if (this._start < this._current - this._limit) {
      this._createListItem({
        data: {
          value: this._start,
        },
        link: {
          value: this._start,
          text: this._start,
        },
      });
    }
  }

  _createListItemControlBack() {
    if (this._current - this._start > this._limit) {
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
    $item.appendTo(this._$dummy);
    this._$dummy.add($item);
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
  _handleWindowResize() {
    this._correctLimit();
    this._updateListItems();
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
}

export default Pagination;
