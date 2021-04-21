import { makeComponentLoadHandler } from '../../helpers';
import SearchRoomFilter from './SearchRoomFilter';
import data from './data.json';

$(window).on(
  'load',
  { props: data },
  makeComponentLoadHandler(SearchRoomFilter)
);

export default SearchRoomFilter;
