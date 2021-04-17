import { makeComponentLoad } from '../../helpers/utils';
import RoomDetails from './RoomDetails';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(RoomDetails));
