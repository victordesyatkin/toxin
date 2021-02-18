import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import './pagination.scss';

class Pagination extends Component {
  _query = '.js-pagination';

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

  _init() {
    this._attachEventHandler();
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
