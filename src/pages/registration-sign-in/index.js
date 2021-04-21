import { makeComponentLoadHandler } from '../../helpers';
import RegistrationSignIn from './RegistrationSignIn';
import data from './data.json';

$(window).on(
  'load',
  { props: data },
  makeComponentLoadHandler(RegistrationSignIn)
);
