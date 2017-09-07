// const IronTree = require('@denq/iron-tree');
const IronTree = require('iron-tree');
const defaultOptions = {
  key_id: 'id' ,
  key_parent: 'parent' ,
  key_child: 'child',
  empty_children: false,
};

// function sortBy(propertyA, propertyB) {
//   return function(a, b) {
//     if (a.get(propertyB) < b.get(propertyB)) {
//       if (a.get(propertyA) > b.get(propertyA)) {
//         return 1;
//       }
//       return -1;
//     } else {
//       if (a.get(propertyA) < b.get(propertyA)) {
//         return -1;
//       }
//       return 1;
//     }
//   };
// };
function sortBy(collection, propertyA, propertyB) {
    return collection.sort(function(a, b) {
        if (a[propertyB] < b[propertyB]) {
            if (a[propertyA] > b[propertyA]) {
                return 1;
            }
            return -1;
        } else {
            if (a[propertyA] < b[propertyA]) {
                return -1;
            }
            return 1;
        }
    });
};

module.exports = class LTT{

  constructor(list, options = {}) {
    options = Object.assign(options, defaultOptions);
    this.options = options;
    const { key_id, key_parent } = options;

    const tree = new IronTree({ [key_id]: 0 });
    sortBy(list, key_parent, key_id);
    list.forEach((item, index) => {
      tree.add((parentNode) => {
        return parentNode.get(key_id) === item[key_parent];
      }, item);
    });

    this.tree = tree;
  }

  GetTree() {
    const { key_child, empty_children } = this.options;
    return this.tree.toJson({
      key_children: key_child,
      empty_children,
    })[key_child];
  }

}
