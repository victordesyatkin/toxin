import bind from 'bind-decorator';

import { Component } from '../../helpers/utils';
import FilterDateDropdown from '../../components/filter-date-dropdown';
import Dropdown from '../../components/dropdown';
import CardSlider from '../../components/card-slider';
import RangeSlider from '../../components/range-slider';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list';
import Pagination from '../../components/pagination';
import '../../components/checkbox-buttons';
import '../../components/rich-checkbox-buttons';
import Base from '../base/base';
import data from './data.json';
import './search-room-filter.scss';

class SearchRoomFilter extends Component {
  static handleComponentLoad() {
    console.log('SearchRoomFilter handleComponentLoad options : ', data);
    const searchRoomFilter = new SearchRoomFilter({ props: data });
    return searchRoomFilter;
  }

  _query = '.js-search-room-filter';

  _className = 'search-room-filter';

  constructor(options) {
    console.log('SearchRoomFilter constructor options : ', options);
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
    console.log('SearchRoomFilter _init this._props: ', this._props);
    this._base = new Base({
      props: this._props,
    });
    this._filterDateDropdown = new FilterDateDropdown({
      parent: $(`${this._query}__filter-date-dropdown`, this._$element),
      props: filterDateDropdown,
    });
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

window.addEventListener('load', SearchRoomFilter.handleComponentLoad);

export default SearchRoomFilter;
