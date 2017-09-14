# list-to-tree
This lib is help-tool for convertation list to tree a data structure.

### Attention
> * Recently I have rewritten the project and now it is based on [IronTree](https://github.com/DenQ/iron-tree) - it allowed to do the project in unix way style and added flexibility. IronTree has a fairly rich interface.
>* The tree can now be sorted - you only need to pass your sorting method if you are not satisfied with the native sorting.

## Install on npm
    npm install list-to-tree --save

## Usage
```js
    var LTT = require('list-to-tree');
    var list = [
    {
        id: 1,
        parent: 0
    }, {
        id: 2,
        parent: 1
    }, {
        id: 3,
        parent: 1
    }, {
        id: 4,
        parent: 2
    }, {
        id: 5,
        parent: 2
    }, {
        id: 6,
        parent: 0
    }, {
        id: 7,
        parent: 0
    }, {
        id: 8,
        parent: 7
    }, {
        id: 9,
        parent: 8
    }, {
        id: 10,
        parent: 0
    }
    ];

    var ltt = new LTT(list, {
        key_id: 'id',
        key_parent: 'parent'
    });
    var tree = ltt.GetTree();

    console.log( tree );
```
###### Result

    [{
        "id": 1,
        "parent": 0,
        "child": [
            {
                "id": 2,
                "parent": 1,
                "child": [
                    {
                        "id": 4,
                        "parent": 2
                    }, {
                        "id": 5,
                        "parent": 2
                    }
                ]
            },
            {
                "id": 3,
                "parent": 1
            }
        ]
    }, {
        "id": 6,
        "parent": 0
    }, {
        "id": 7,
        "parent": 0,
        "child": [
            {
                "id": 8,
                "parent": 7,
                "child": [
                    {
                        "id": 9,
                        "parent": 8
                    }
                ]
            }
        ]
    }, {
        "id": 10,
        "parent": 0
    }];


# Properties
* **tree** - This property is `IronTree` type and have methods: add, remove, contains, sort, move, traversal, toJson, etc...
* **options**
  * `key_id` (string) Field name for id item. Default: 'id'.
  * `key_parent` (string) Field name for parent id. Default: 'parent'.
  * `key_child` (string) Field name for children of item. Default  'child'.
  * `empty_children` (boolean) Flag for allow empty children property in item. Default: false.

# Methods
* **constructor(list, options)**
  * params:
    * `list` - array list with elements. Like ```{ id: 5: parent: 1 }```.
    * `options` - optional parameter. Object for describe flags and field names for tree.
* **.GetTree()** This method will be return json tree
  * example:
    ```
      tree.GetTree()
    ```
* **.sort(callback)** The custom sort method
  * callback(a, b) - a and b have `IronTree\Node` type and have methods: add, remove, get, set, sort, traversal, etc...
  * example:
    ```js
    function compareById(vector) {
      return (a, b) => {
        const aid = Number(a.get('id'));
        const bid = Number(b.get('id'));
        if (aid > bid) {
          return vector ? 1 : -1;
        } else if (aid < bid) {
          return vector ? -1 : 1;
        } else {
          return 0
        }
      };
    }
    ltt.sort(compareById(false));
    ```

# Testing
For run testing, typing on your console

    npm test
