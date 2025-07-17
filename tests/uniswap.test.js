import assert from 'assert';

import { optimal_ay_in } from '../src/lib/uniswap-v2.js';

describe('sum module', () => {
  describe('adds 1 + 2 to equal 3', () => {
    it('should do', () => {
      let ax = 1;
      let ay = 2;
      let bx = 3;
      let by = 4;
      let ay_in = optimal_ay_in(ax, ay, bx, by);
      assert.equal(ay_in, 3);
    });
  });
});
