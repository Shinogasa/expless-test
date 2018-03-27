"use strict";

const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const index = require("../routes/index");

describe('Router', function() {
    
    describe('get', function() {
        
        it('ルーターのテスト', function() {
            assert.equal(index.router.get,'/');
        });
    });
});