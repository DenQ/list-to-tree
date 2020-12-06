const LTT = require('../dist/list-to-tree');

describe('Smaller child keys:', function() {

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
                id: 20,
                parent: 1
            }, {
                id: 30,
                parent: 1
            }, {
                id: 14,
                parent: 20
            }, {
                id: 15,
                parent: 20
            }, {
                id: 6,
                parent: 14
            }, {
                id: 7,
                parent: 14
            }, {
                id: 8,
                parent: 15
            }, {
                id: 9,
                parent: 15
            }, {
                id: 10,
                parent: 15
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
        expect( tree.length ).toBe(1);
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

    it('Child node have a child key', function() {
        var child = tree[0][key_child];
        var node = child[0];
        expect( node[key_id] ).toBe(20);
        expect( node[key_parent] ).toBe(1);
        expect( key_child in node ).toBe(true);
    });

    it('3rd depth child node have a child key', function() {
        var node = tree[0][key_child][0][key_child][0];
        expect( node[key_id] ).toBe(14);
        expect( node[key_parent] ).toBe(20);
        expect( key_child in node ).toBe(true);
    });

    it('4th depth child node exists', function() {
        var node = tree[0][key_child][0][key_child][0][key_child][0];
        expect( node[key_id] ).toBe(6);
        expect( node[key_parent] ).toBe(14);
        expect( key_child in node ).toBe(false);
    });
});
