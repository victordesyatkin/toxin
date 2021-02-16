import { renderComponents, renderComponent } from '../../helpers/utils';
import './pagination.scss';

class Pagination {
  static CLASS_NAME = 'PAGINATION';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-pagination',
      render: render || Pagination._renderComponent,
    });
  }

  static _renderComponent(index, element) {
    renderComponent({
      element,
      className: Pagination.CLASS_NAME,
      someClass: Pagination,
    });
  }

  constructor(element) {
    this._element = element;
    this._attachEventHandler();
  }

  _attachEventHandler() {
    this._element &&
      this._element.addEventListener &&
      this._element.addEventListener('click', this._click);
  }

  _click = (event) => {
    let target = (event || {}).target || {} || {};
    const { tagName } = target;
    if (target.closest('div[data-direction]')) {
      target = target.closest('div[data-direction]');
    } else if (target.closest('div[data-item]')) {
      target = target.closest('div[data-item]');
    }
    const { current, direction, item } = target.dataset || {};
    if (parseFloat(current)) {
      return null;
    }
    if (this._element.dataset.current && item && parseFloat(item)) {
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
  };

  _setAttributeDirection = (direction) => {
    const { start, end, current } = this._element.dataset;
    let hidden = false;
    if (
      (direction === 'prev' && start === current) ||
      (direction === 'next' && end === current)
    ) {
      hidden = true;
    }
    const element = this._element.querySelector(
      `[data-direction="${direction}"]`
    );
    element && element.classList.toggle('pagination_hidden', hidden);
  };

  _renderText = () => {
    let { end, current, text, count } = this._element.dataset;
    end = parseFloat(end);
    current = parseFloat(current);
    count = parseFloat(count);
    if (
      text &&
      typeof text === 'string' &&
      text.trim().length &&
      count &&
      current &&
      end
    ) {
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
    let { start, end, current, limit } = this._element.dataset;
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
    for (let i = current - limit; i <= current + limit; i++) {
      if (i < start) {
        continue;
      }
      if (i > end) {
        continue;
      }
      pages.push(i);
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
