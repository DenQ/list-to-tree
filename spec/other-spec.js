var LTT = require('../dist/list-to-tree.npm');

describe('Default keys:', function() {

    var tree = null;

    beforeEach(function() {
        var list = [
            { "id" : 6000, "parent" : 0 },
            { "id" : 6001, "parent" : 6000 },
            { "id" : 6002, "parent" : 6000},
            { "id" : 6003, "parent" : 6000 },
            { "id" : 6004, "parent" : 6000 },
            { "id" : 6005, "parent" : 6000 },
            { "id" : 6006, "parent" : 6000 },
            { "id" : 6007, "parent" : 6000 },
            { "id" : 6008, "parent" : 6001 },
        ];
        var ltt = new LTT(list);
        tree = ltt.GetTree();
    });


    it('It is workly', function() {
        expect( tree.length ).toBe(1);

    });

    it('First node check id', function() {
        var firstNode = tree[0];
        expect( firstNode.id ).toBe(6000);
    });

    it('First node check parent', function() {
        var firstNode = tree[0];
        expect( firstNode.parent ).toBe(0);
    });

    it('First node check child', function() {
        var child = tree[0].child;
        expect( child.length ).toBe(7);
    });

    it('First child - check id', function() {
        var child = tree[0].child;
        var node = child[0];
        expect( node.id ).toBe(6001);
    });

    it('First child - check parent', function() {
        var child = tree[0].child;
        var node = child[0];
        console.log(node.parent);
        expect( node.parent ).toBe(6000);
    });

    it('Child node have a child key', function() {
        var child = tree[0].child;
        var node = child[0];
        expect( 'child' in node ).toBe(true);
    });

});
