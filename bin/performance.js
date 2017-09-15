"use strict"
const LTT = require('../dist/old/list-to-tree.npm.js');
const LTT1 = require('../dist/list-to-tree.js');
const IronTree = require('@denq/iron-tree');

const LENGTH = 25000;

function getList() {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const list = (new Array(LENGTH))
    .fill()
    .map((item, index) => {
      return {
        id: index + 1,
        parent: getRandomInt(0, index)
      }
    });
  return list;
}

function performanceCalc(fn, ...params) {
  const start = +new Date()
  const result = fn(...params)
  const end = +new Date()

  console.log(`Result: ${result}. Execution Time: ${end - start} ms`)
}

const list = getList();
const xlist = list.map(item => Object.assign({}, item));

function runListToTree() {
  // const _list = Array(list.length).fill().map((item, index) => list[index]);
  var ltt = new LTT(xlist, {
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
  return 'iron-tree'
}

function runNewListToTree() {
  const ltt = new LTT1(list, {
    key_id: 'id',
    key_parent: 'parent',
    key_child: 'children',
    many_items: true,
  });
  var tree = ltt.GetTree();
  return 'new list-to-tree';
}

performanceCalc(runListToTree);
performanceCalc(runIronTree);
performanceCalc(runNewListToTree);
