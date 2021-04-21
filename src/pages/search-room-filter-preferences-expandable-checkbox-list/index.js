import { makeComponentLoadHandler } from '../../helpers';
import SearchRoomFilter from '../search-room-filter';
import data from './data.json';

$(window).on(
  'load',
  { props: data },
  makeComponentLoadHandler(SearchRoomFilter)
);
