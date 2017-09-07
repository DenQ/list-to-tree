const LTT = require('../dist/list-to-tree');

describe('Base usage:', function() {

    var tree = null;
    var key_id = 'id';
    var key_parent = 'parent';

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
            }
        ];
        var ltt = new LTT(list, {
            key_id: key_id,
            key_parent: key_parent
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
        var child = tree[0].child;
        expect( child.length ).toBe(2);
    });

    it('First child - check id', function() {
        var child = tree[0].child;
        var node = child[0];
        expect( node[key_id] ).toBe(2);
    });

    it('First child - check parent', function() {
        var child = tree[0].child;
        var node = child[0];
        expect( node[key_parent] ).toBe(1);
    });

    it('Child node not have a child key', function() {
        var child = tree[0].child;
        var node = child[0];
        expect( 'child' in node ).toBe(false);
    });

});
