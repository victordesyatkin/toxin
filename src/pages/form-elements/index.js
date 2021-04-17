import { makeComponentLoad } from '../../helpers/utils';
import FormElements from './FormElements';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(FormElements));
