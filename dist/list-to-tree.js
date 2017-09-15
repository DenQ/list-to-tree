const IronTree = require('@denq/iron-tree');
const sortBy  = require('../utils/sort-by');
const compareById = require('../utils/compare-by-id');

const defaultOptions = {
  key_id: 'id' ,
  key_parent: 'parent' ,
  key_child: 'child',
  empty_children: false,
};

module.exports = class LTT{

  constructor(list, options = {}) {
    const _list = list.map((item) => item);

    options = Object.assign({}, defaultOptions, options);
    this.options = options;

    // this.split(_list);
    const tree = this.buildTree(_list);

    this.tree = tree;
  }

  buildTree(list) {
    const { key_id, key_parent } = this.options;

    sortBy(list, key_parent, key_id);
    const tree = new IronTree({ [key_id]: 0 });
    list.forEach((item, index) => {
      tree.add((parentNode) => {
        return parentNode.get(key_id) === item[key_parent];
      }, item);
    });
    return tree;
  }

  sort(criteria) {
    this.tree.sort(criteria);
  }

  split(list) {
    const { key_id, key_parent } = this.options;

    list.sort(compareById(true, key_parent));
    const rootParentId = list[0][key_parent];

    const collection = [];
    list.forEach((item) => {
      if (item[key_parent] === rootParentId) {
        collection.push([item]);
      } else {
        collection.forEach((el) => {
          el.forEach((child) => {
            if (child[key_id] === item[key_parent]) {
              el.push(item);
            }
          });
        });

      }
    });
    return collection;
  }

  GetTree() {
    const { key_child, empty_children } = this.options;
    return this.tree.toJson({
      key_children: key_child,
      empty_children: false,
    })[key_child];
  }

}
