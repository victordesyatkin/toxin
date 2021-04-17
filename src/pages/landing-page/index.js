import { makeComponentLoad } from '../../helpers/utils';
import LandingPage from './LandingPage';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(LandingPage));

export default LandingPage;
