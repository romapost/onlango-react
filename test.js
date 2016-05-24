import test from 'tape';
import spec from 'tap-spec';

import async from './test/async.js';

test
  .createStream()
  .pipe(spec())
  .pipe(process.stdout);

const run = t => test(t.name, t.test);

run(async);
