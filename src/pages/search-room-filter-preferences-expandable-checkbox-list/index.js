import { makeComponentLoad } from '../../helpers/utils';
import SearchRoomFilter from '../search-room-filter';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(SearchRoomFilter));
