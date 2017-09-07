const LTT = require('./dist/list-to-tree');

typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = LTT :
typeof define === 'function' && define.amd ? define(LTT) :
this.LTT = LTT;
