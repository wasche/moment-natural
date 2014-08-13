var assert = require('assert');
var moment = require('../moment.natural');

/* global describe, it */
describe('moment', function(){
  describe('#natural()', function(){
    var data = [
      {ms: -86400000, str: 'yesterday'}
    , {ms: 86400000, str: 'tomorrow'}
    , {ms: -100800000, str: 'yesterday midnight'}
    , {ms: 115200000, str: 'noon tomorrow'}
    , {ms: 36000000, str: '2p'}
    , {ms: -7200000, str: '2 hours ago'}
    , {ms: -1800000, str: '-30m'}
    ];

    data.forEach(function(test){

      it('should parse: ' + test.str, function(){
        assert.equal(947062800000 + test.ms, moment(947062800000).natural(test.str).valueOf());
      });

    });
    
  });
});