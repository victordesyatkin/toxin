import { makeComponentLoad } from '../../helpers/utils';
import HeadersAndFooters from './HeadersAndFooters';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(HeadersAndFooters));
