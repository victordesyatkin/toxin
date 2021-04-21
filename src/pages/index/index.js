import { makeComponentLoadHandler } from '../../helpers';
import LandingPage from '../landing-page';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(LandingPage));
