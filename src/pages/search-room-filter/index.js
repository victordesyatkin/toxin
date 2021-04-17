import { makeComponentLoad } from '../../helpers/utils';
import SearchRoomFilter from './SearchRoomFilter';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(SearchRoomFilter));

export default SearchRoomFilter;
