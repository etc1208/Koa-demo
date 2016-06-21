/**
 * Created by yh on 2016/6/21.
 */
var assert = require('assert');

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value not present', function () {
            assert.equal(-1, [1,2,3].indexOf(4));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});