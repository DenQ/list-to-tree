var LTT = require('../dist/list-to-tree.npm.js');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function performanceCalc(fn, ...params) {
    const start = +new Date()
    const result = fn(...params)
    const end = +new Date()

    console.log(`Result: ${result}. Execution Time: ${end - start} ms`)
}

const list = (new Array(20000))
  .fill()
  .map((item, index) => {
    return {
      id: index + 1,
      parent: getRandomInt(0, index)
    }
  });

function run() {
  var ltt = new LTT(list, {
    key_id: 'id',
    key_parent: 'parent'
  });
  var tree = ltt.GetTree();
}

performanceCalc(run);
