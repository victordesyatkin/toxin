import { renderComponents, renderComponent } from "../../assets/helpers/utils";

import FilterDateDropdown from "../../components/filter-date-dropdown";
import Dropdown from "../../components/dropdown";
import RangeSlider from "../../components/range-slider";
import ExpandableCheckboxList from "../../components/expandable-checkbox-list";
import CardSlider from "../../components/card-slider";
import Pagination from "../../components/pagination";
import Footer from "../../components/footer";
import "../../components/checkbox-buttons";
import "../../components/rich-checkbox-buttons";
import "../base/base";

import "./search-room-filter.scss";

export default class SearchRoomFilter {
  static CLASS_NAME = "SEARCH_ROOM_FILTER";

  static renderComponents(props = {}) {
    const { parents, query, render } = props;
    renderComponents({
      parents,
      query: query || ".js-search-room-filter",
      render: render || SearchRoomFilter._renderComponent,
    });
  }

  static _renderComponent() {
    renderComponent({
      element: arguments[1],
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
    FilterDateDropdown.renderComponents({ parents: this._$element });
    Dropdown.renderComponents({ parents: this._$element });
    RangeSlider.renderComponents({ parents: this._$element });
    ExpandableCheckboxList.renderComponents({ parents: this._$element });
    CardSlider.renderComponents({ parents: this._$element });
    Pagination.renderComponents({ parents: this._$element });
    Footer.renderComponents();
  }
}

window.addEventListener("load", SearchRoomFilter.renderComponents);
