import { makeComponentLoadHandler } from '../../helpers';
import FormElements from './FormElements';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(FormElements));
