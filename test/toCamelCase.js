import test from 'tape';
import {toCamelCase} from '../src/actions/createSocketActions.js';

test('toCamelCase', t => {
  t.equal(toCamelCase('TEST'), 'test');
  t.equal(toCamelCase('TEST_TEST'), 'testTest');
  t.equal(toCamelCase('testTest'), 'testTest');
  t.end();
});
