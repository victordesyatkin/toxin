import SearchRoomFilter from '../search-room-filter/SearchRoomFilter';
import data from './data.json';
import './search-room-filter-preferences-dropdown.scss';

class SearchRoomFilterPreferencesDropdown {
  static handleComponentLoad() {
    const searchRoomFilter = new SearchRoomFilter({ props: data });
    return searchRoomFilter;
  }
}

window.addEventListener(
  'load',
  SearchRoomFilterPreferencesDropdown.handleComponentLoad
);

export default SearchRoomFilterPreferencesDropdown;
