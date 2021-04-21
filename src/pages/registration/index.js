import { makeComponentLoadHandler } from '../../helpers';
import Registration from './Registration';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(Registration));
