const IronTree = require('@denq/iron-tree');

const defaultOptions = {
  key_id: 'id' ,
  key_parent: 'parent' ,
  key_child: 'child',
  empty_children: false,
};

const depthKeyName = '__depth'

function sortBy(collection, propertyA, propertyB, propertyC) {
  return collection.sort(function(a, b) {
    return a[propertyA] - b[propertyA] || a[propertyB] - b[propertyB] || a[propertyC] - b[propertyC];
  });
};

function writeDepth(collection, parentKeyName, keyName, remainingList, currentDepth = 0, parentIds = [0]) {
  if (remainingList.length === 0) return;
  const nextParentIds = []
  const nextRemainingList = []
  remainingList.forEach((item) => {
    if (parentIds.includes(item[parentKeyName])) {
      item[depthKeyName] = currentDepth
      nextParentIds.push(item[keyName])
    } else {
      nextRemainingList.push(item)
    }
  })
  if(remainingList.length === nextRemainingList.length) throw Error(`Invalid node: ${JSON.stringify(remainingList)}`)
  writeDepth(collection, parentKeyName, keyName, nextRemainingList, currentDepth + 1, nextParentIds)
};

module.exports = class LTT{

  constructor(list, options = {}) {
    const _list = list.map((item) => item);

    options = Object.assign({}, defaultOptions, options);
    this.options = options;
    const { key_id, key_parent } = options;

    writeDepth(_list, key_parent, key_id, _list)
    sortBy(_list, depthKeyName, key_parent, key_id);

    const tree = new IronTree({ [key_id]: 0 });
    _list.forEach((item, index) => {
      tree.add((parentNode) => {
        return parentNode.get(key_id) === item[key_parent];
      }, item);
    });

    this.tree = tree;
  }

  sort(criteria) {
    this.tree.sort(criteria);
  }

  GetTree() {
    const { key_child, empty_children } = this.options;
    return this.tree.toJson({
      key_children: key_child,
      empty_children
    })[key_child];
  }

}
