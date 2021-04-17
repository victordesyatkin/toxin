import { makeComponentLoad } from '../../helpers/utils';
import RegistrationSignIn from './RegistrationSignIn';
import data from './data.json';

$(window).on('load', { props: data }, makeComponentLoad(RegistrationSignIn));
