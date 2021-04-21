import { makeComponentLoadHandler } from '../../helpers';
import Cards from './Cards';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(Cards));

export default Cards;
