import { makeComponentLoadHandler } from '../../helpers';
import RoomDetails from './RoomDetails';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(RoomDetails));
