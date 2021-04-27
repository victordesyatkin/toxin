import bind from 'bind-decorator';

import { Component } from '../../helpers';
import FilterDateDropdown from '../../components/filter-date-dropdown';
import Dropdown from '../../components/dropdown';
import CardSlider from '../../components/card-slider';
import RangeSlider from '../../components/range-slider';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list';
import Pagination from '../../components/pagination';
import Base from '../../templates/base';

class SearchRoomFilter extends Component {
  _query = '.js-search-room-filter';

  _className = 'search-room-filter';

  constructor(options) {
    super(options);
    this._renderComponent();
  }

  _init() {
    const {
      filterDateDropdown,
      dropdown1,
      rangeSlider,
      dropdown2,
      expandableCheckboxList,
      pagination,
    } = this._props;
    this._search = {};
    this._prepareSearch();
    const { start, end, adult, child, baby } = this._search;
    this._base = new Base({
      props: this._props,
    });
    filterDateDropdown.items[0].value =
      start || filterDateDropdown.items[0].value;
    filterDateDropdown.items[1].value =
      end || filterDateDropdown.items[1].value;
    this._filterDateDropdown = new FilterDateDropdown({
      parent: $(`${this._query}__filter-date-dropdown`, this._$element),
      props: filterDateDropdown,
    });
    dropdown1.items[0].value = adult || dropdown1.items[0].value;
    dropdown1.items[1].value = child || dropdown1.items[1].value;
    dropdown1.items[2].value = baby || dropdown1.items[2].value;
    this._dropdown1 = new Dropdown({
      parent: $(`${this._query}__dropdown-first`, this._$element),
      props: dropdown1,
    });
    this._rangeSlider = new RangeSlider({
      parent: $(`${this._query}__range-slider`, this._$element),
      props: rangeSlider,
    });
    this._dropdown2 = new Dropdown({
      parent: $(`${this._query}__dropdown-second`, this._$element),
      props: dropdown2,
    });
    this._expandableCheckboxList = new ExpandableCheckboxList({
      parent: $(`${this._query}__expandable-checkbox-list`, this._$element),
      props: expandableCheckboxList,
    });
    this._cardSliders = [];
    this._$cardSliders = $(`${this._query}__card-slider`, this._$element);
    this._$cardSliders.each(this._renderCardSlider);
    this._pagination = new Pagination({
      parent: $(`${this._query}__pagination`, this._$element),
      props: pagination,
    });
  }

  _prepareSearch() {
    const search = window?.location?.search;
    const searchParams = new URLSearchParams(search);
    for (const [key, value] of searchParams.entries()) {
      this._search[key] = value;
    }
  }

  @bind
  _renderCardSlider(index, element) {
    const props = this._props?.cardSliders?.[index];
    this._cardSliders.push(
      new CardSlider({
        parent: $(element, this._$element),
        props,
      })
    );
  }
}

export default SearchRoomFilter;
