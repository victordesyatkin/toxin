import { requireAll } from '../../helpers/utils';
import './logo-image.scss';

requireAll(require.context('./images/', false, /\.svg$/));
