# list-to-tree
This lib is help-tool for convertation list to tree a data structure.

## Install on bower
    bower install list-to-tree --save
    
## Install on npm
    npm install list-to-tree --save

## Usage

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

# Api
    var ltt = new LTT(list, {
        key_id: 'our id key',
        key_parent: 'our parent key',
        key_child: 'our child key'
    });

If two param will not have, then:
* key_id === 'id',
* key_parent === 'parent'
* key_child === 'child'

You can be set names this params any words


# Testing
Need [Jasmine](https://github.com/jasmine/jasmine) a testing framework

For run testing, typing on your console

    jasmine
