// const IronTree = require('@denq/iron-tree');
const IronTree = require('iron-tree');

module.exports = class LTT{

  constructor(list, options = {}) {
    const tree = new IronTree({ id: 0 });
    list.forEach((item, index) => {
      tree.add((parentNode) => {
        return parentNode.get('id') === item.parent;
      }, item);
    });
    this.tree = tree;
  }

  GetTree() {
    return this.tree.toJson({
      key_children: 'child',
      empty_children: false,
    }).child;
  }

}
