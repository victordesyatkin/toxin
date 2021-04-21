import { makeComponentLoadHandler } from '../../helpers';
import LandingPage from './LandingPage';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoadHandler(LandingPage));

export default LandingPage;
