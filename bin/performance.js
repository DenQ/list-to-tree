var LTT = require('../dist/list-to-tree.npm.js');
const IronTree = require('@denq/iron-tree');

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


function runListToTree() {
  var ltt = new LTT(list, {
    key_id: 'id',
    key_parent: 'parent',
    key_child: 'children',
  });
  var tree = ltt.GetTree();
  return 'list-to-tree';
}

function runIronTree() {
  const tree = new IronTree({ id: 0 });
  list.forEach((item, index) => {
    tree.add((parentNode) => {
      return parentNode.get('id') === item.parent;
    }, item);
  });
  const jTree = tree.toJson({
    empty_children: false,
  });
  // console.log(jTree.children);
  return 'iron-tree'
}

performanceCalc(runListToTree);
performanceCalc(runIronTree);
