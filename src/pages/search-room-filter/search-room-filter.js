import { renderComponents, renderComponent } from '../../helpers/utils';
import FilterDateDropdown from '../../components/filter-date-dropdown';
import Dropdown from '../../components/dropdown';
import RangeSlider from '../../components/range-slider';
import ExpandableCheckboxList from '../../components/expandable-checkbox-list';
import CardSlider from '../../components/card-slider';
import Pagination from '../../components/pagination';
import Footer from '../../components/footer';
import '../../components/checkbox-buttons';
import '../../components/rich-checkbox-buttons';
import '../base/base';
import './search-room-filter.scss';

class SearchRoomFilter {
  static CLASS_NAME = 'SEARCH_ROOM_FILTER';

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || '.js-search-room-filter',
      render: render || SearchRoomFilter._renderComponent,
    });
  }

  static _renderComponent(inde, element) {
    renderComponent({
      element,
      className: SearchRoomFilter.CLASS_NAME,
      someClass: SearchRoomFilter,
    });
  }

  constructor(element) {
    this._element = element;
    this._$element = $(element);
    this._init();
  }

  _init() {
    const parents = this._$element;
    FilterDateDropdown.renderComponents({ parents });
    Dropdown.renderComponents({ parents });
    RangeSlider.renderComponents({ parents });
    ExpandableCheckboxList.renderComponents({ parents });
    CardSlider.renderComponents({ parents });
    Pagination.renderComponents({ parents });
    Footer.renderComponents();
  }
}

window.addEventListener('load', SearchRoomFilter.renderComponents);

export default SearchRoomFilter;
