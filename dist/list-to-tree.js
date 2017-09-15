const IronTree = require('@denq/iron-tree');
const sortBy = require('../utils/sort-by');
const compareById = require('../utils/compare-by-id');

const defaultOptions = {
  key_id: 'id' ,
  key_parent: 'parent' ,
  key_child: 'child',
  empty_children: false,
  many_items: false,
};

module.exports = class LTT{

  constructor(list, options = {}) {
    const _list = list.map((item) => item);

    options = Object.assign({}, defaultOptions, options);
    this.options = options;

    if (options.many_items) {
      const collections = this.split(_list);
      this.tree = collections.map((item) => {
        return this.buildTreeFromList(item);
      });
    } else {
      this.tree = this.buildTreeFromList(_list);
    }
  }

  buildTreeFromList(list) {
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
    const { many_items } = this.options;
    if (many_items) {
      this.tree.forEach((item) => {
        item.sort(criteria);
      });
      //hack
      this.tree = this.tree.map((item) => {
        const id = item.rootNode.children[0].get('id')
        item.set('id', id);
        item.set('xid', id);
        return item;
      });
      this.tree.sort(criteria);
      // end hack
    } else {
      this.tree.sort(criteria);
    }
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
    const { key_child, empty_children, many_items } = this.options;
    if (many_items) {
      const trees = this.tree.map((item) => {
        return item.toJson(this.options).children[0];
      });
      return [].concat(...trees);
    } else {
      return this.tree.toJson({
        key_children: key_child,
        empty_children: false,
      })[key_child];
    }
  }

}
