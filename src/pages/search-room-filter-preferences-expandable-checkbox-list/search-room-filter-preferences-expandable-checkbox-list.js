import SearchRoomFilter from '../search-room-filter/SearchRoomFilter';
import data from './data.json';
import './search-room-filter-preferences-expandable-checkbox-list.scss';

class SearchRoomFilterPreferencesExpandableCheckboxList {
  static handleComponentLoad() {
    const searchRoomFilter = new SearchRoomFilter({ props: data });
    return searchRoomFilter;
  }
}

window.addEventListener(
  'load',
  SearchRoomFilterPreferencesExpandableCheckboxList.handleComponentLoad
);

export default SearchRoomFilterPreferencesExpandableCheckboxList;
