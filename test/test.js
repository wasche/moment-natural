var assert = require('assert');
var moment = require('../moment.natural');

/* global describe, it */
describe('moment', function(){
  describe('#natural()', function(){
    var origin = 1413774000000; // Mon, 2014.10.20 @ 03:00:00am UTC
    var offset = new Date().getTimezoneOffset() * 60 * 1000;
    origin += offset; // convert to local time
    var data = [
      {str: 'yesterday'         , ms: -   24*60*60*1000}
    , {str: 'tomorrow'          , ms:     24*60*60*1000}
    , {str: 'yesterday midnight', ms: -   27*60*60*1000}
    , {str: 'noon tomorrow'     , ms:     33*60*60*1000}
    , {str: '2p'                , ms:     11*60*60*1000}
    , {str: '2 hours ago'       , ms: -    2*60*60*1000}
    , {str: '-30m'              , ms: -      30*60*1000}
    , {str: 'last week'         , ms: - 7*24*60*60*1000}
    , {str: '2 days ago'        , ms: - 2*24*60*60*1000}
    , {str: 'next month'        , ms:  31*24*60*60*1000+60*60*1000} // crosses DST boundary
    ];

    data.forEach(function(test){

      it('should parse: ' + test.str, function(){
        var actual = moment(origin).natural(test.str);
        var expected = moment(origin + test.ms);
        assert.equal(
          actual.valueOf(),
          expected.valueOf(),
          'Actual: ' + actual.format() + ', Expected: ' + expected.format()
        );
      });

    });
    
  });
});