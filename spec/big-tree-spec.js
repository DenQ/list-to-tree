const LTT = require('../dist/list-to-tree');

describe('Big tree:', function() {

    var tree = null;

    var key_id = 'id';

    var key_parent = 'parent';

    var key_child = 'child';

    beforeEach(function() {
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
            key_id: key_id,
            key_parent: key_parent,
            key_child: key_child
        });
        tree = ltt.GetTree();
    });


    it('It is workly', function() {
        expect( tree.length ).toBe(4);

    });

    it('First node check id', function() {
        var firstNode = tree[0];
        expect( firstNode[key_id] ).toBe(1);
    });

    it('First node check parent', function() {
        var firstNode = tree[0];
        expect( firstNode[key_parent] ).toBe(0);
    });

    it('First node check child', function() {
        var child = tree[0][key_child];
        expect( child.length ).toBe(2);
    });

    it('First child - check id', function() {
        var child = tree[0][key_child];
        var node = child[0];
        expect( node[key_id] ).toBe(2);
    });

    it('First child - check parent', function() {
        var child = tree[0][key_child];
        var node = child[0];
        expect( node[key_parent] ).toBe(1);
    });

    it('Child node have a child key', function() {
        var child = tree[0][key_child];
        var node = child[0];
        expect( key_child in node ).toBe(true);
    });

});
