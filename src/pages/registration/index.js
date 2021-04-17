import { makeComponentLoad } from '../../helpers/utils';
import Registration from './Registration';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(Registration));
