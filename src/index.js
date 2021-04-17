import { requireAll } from './helpers/utils';

requireAll(
  require.context(
    './',
    true,
    /\.(js|scss|jpg|png|svg|json|webmanifest|ico|xml)$/
  )
);
