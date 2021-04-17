import { makeComponentLoad } from '../../helpers/utils';
import LandingPage from '../landing-page';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(LandingPage));
