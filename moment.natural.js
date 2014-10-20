(function (root, factory) {
  'use strict';

  /* global define */
  if (typeof define === 'function' && define.amd) {
    define(['moment'], function (moment) {
      return factory(moment);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('moment'));
  } else {
    root.moment = factory(root.moment);
  }
}(this, function (moment) {
  'use strict';

  var NAMES = ['yesterday', 'tomorrow', 'midnight', 'noon'];
  var FNS = [
    function(){
      return this.subtract(1, 'days');
    },
    function(){
      return this.add(1, 'days');
    },
    function(){
      return this.hour(0).minute(0).second(0).millisecond(0);
    },
    function(){
      return this.hour(12).minute(0).second(0).millisecond(0);
    }
  ];

  var named = {};
  for (var i = 0; i < NAMES.length; i++){
    named[NAMES[i]] = FNS[i];
    moment.fn[NAMES[i]] = FNS[i];
  }

  moment.fn.natural = function(dateString){

    var o = dateString.split(/\s+/).reduce(function(o, word){
      var n;
      if (named[word]){
        o.date[word]();
      } else if ('last' === word || 'ago' === word){
        o.dir = -1;
      } else if ('next' === word){
        o.dir = 1;
      } else if (/(\d)([ap])m?/.test(word)){ // 3pm
        n = parseInt(RegExp.$1);
        if (RegExp.$2 === 'p') { n += 12; }
        o.date.hour(n);
      } else if (/(\d{1,2}):(\d{1,2})([ap]?)m?/.test(word)){ // 4:30a
        o.date.minute(parseInt(RegExp.$2));
        n = parseInt(RegExp.$1);
        if (RegExp.$3 === 'p'){ n += 12; }
        o.date.hour(n);
      } else if (/(-?)(\d+)(\w+)/.test(word)){ // -2h
        n = parseInt(RegExp.$2);
        if (RegExp.$1 === '-'){
          o.date.subtract(n, RegExp.$3);
        } else {
          o.date.add(n, RegExp.$3);
        }
      } else if (/\d+/.test(word)){
        o.value = parseInt(word);
      } else {
        o.unit = word;
      }
      return o;
    }, {date: this, dir: 1, value: 1});

    if (o.unit && o.value){
      if (o.dir === -1){
        this.subtract(o.value, o.unit);
      } else {
        this.add(o.value, o.unit);
      }
    }

    return this;
  };

  moment.natural = function(dateString){
    return moment().natural(dateString);
  };

  return moment;
}));