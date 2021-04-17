import { makeComponentLoad } from '../../helpers/utils';
import Cards from './Cards';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(Cards));

export default Cards;
