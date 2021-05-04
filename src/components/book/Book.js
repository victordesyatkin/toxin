import bind from 'bind-decorator';

import { Component } from '../../helpers';
import Dropdown from '../dropdown';
import DateDropdown from '../date-dropdown';
import OrderTotal from '../order-total';
import FactoryOrderItem from '../factory-order-item';

class Book extends Component {
  _query = '.js-book';

  _className = 'book';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const {
      dateDropdown,
      dropdown,
      header,
      total,
      unit,
      numberFormat,
    } = this._props;
    this._factoryOrderItem = new FactoryOrderItem(this._props);
    this._orderItems = [];
    $(`${this._query}__order-item`, this._$element).each(this._createOrderItem);
    this._orderTotal = new OrderTotal({
      parent: $(`${this._query}__order-total`, this._$element),
      props: { ...total, unit, numberFormat },
    });
    this._dateDropdown = new DateDropdown({
      parent: $(`${this._query}__date-dropdown`, this._$element),
      props: {
        ...dateDropdown,
        handleCalendarClick: this._handleCalendarClick,
        handleApplyButtonClick: this._handleCalendarClick,
      },
    });
    this._dropdown = new Dropdown({
      parent: $(`${this._query}__dropdown`, this._$element),
      props: dropdown,
    });
    this._header = new Headers({
      parent: $(`${this._query}__header`, this._$element),
      props: header,
    });
  }

  @bind
  _createOrderItem(index, element) {
    const { order } = this._props;
    const item = order?.[index];
    if (item) {
      this._orderItems.push(
        this._factoryOrderItem.create({
          parent: $(element, this._$element),
          item,
        })
      );
    }
  }

  @bind
  _handleCalendarClick(dates = []) {
    const [start, end] = dates;
    let duration = 0;
    if (start && end) {
      duration = Math.round(
        (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)
      );
    }
    this._update({ duration });
  }

  _update(data) {
    this._orderItems.forEach((item) => {
      item.update(data);
    });
    this._orderTotal.update({ items: this._orderItems });
  }
}

export default Book;
