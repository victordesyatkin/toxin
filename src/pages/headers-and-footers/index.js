import { makeComponentLoadHandler } from '../../helpers';
import HeadersAndFooters from './HeadersAndFooters';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(HeadersAndFooters));
