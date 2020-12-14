const LTT = require('../dist/list-to-tree');

describe('Smaller child keys:', function() {

    let tree = null;

    const key_id = 'id';

    const key_parent = 'parent';

    const key_child = 'child';

    const depthKeyName = '__depth'

    beforeEach(function() {
        const list = [
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
        const ltt = new LTT(list, {
            key_id: key_id,
            key_parent: key_parent,
            key_child: key_child
        });
        tree = ltt.GetTree();
    });

    it('It is workly', function() {
        expect( tree.length ).toBe(1);
    });

    it('1st node', function() {
        const node = tree[0];
        expect( node[key_id] ).toBe(1);
        expect( node[key_parent] ).toBe(0);
        expect( key_child in node ).toBe(true);
        expect( node[key_child].length ).toBe(2);
        expect( node[depthKeyName] ).toBe(0);
    });

    it('2nd depth node', function() {
        const node = tree[0][key_child][0];
        expect( node[key_id] ).toBe(20);
        expect( node[key_parent] ).toBe(1);
        expect( key_child in node ).toBe(true);
        expect( node[depthKeyName] ).toBe(1);
    });

    it('3rd depth node 1', function() {
        const node = tree[0][key_child][0][key_child][0];
        expect( node[key_id] ).toBe(14);
        expect( node[key_parent] ).toBe(20);
        expect( key_child in node ).toBe(true);
        expect( node[depthKeyName] ).toBe(2);
    });

    it('3rd depth node 2', function() {
        const node = tree[0][key_child][0][key_child][1];
        expect( node[key_id] ).toBe(15);
        expect( node[key_parent] ).toBe(20);
        expect( key_child in node ).toBe(true);
        expect( node[depthKeyName] ).toBe(2);
    });

    it('4th depth node 1', function() {
        const node = tree[0][key_child][0][key_child][0][key_child][0];
        expect( node[key_id] ).toBe(6);
        expect( node[key_parent] ).toBe(14);
        expect( key_child in node ).toBe(false);
        expect( node[depthKeyName] ).toBe(3);
    });

    it('4th depth node 2', function() {
        const node = tree[0][key_child][0][key_child][0][key_child][1];
        expect( node[key_id] ).toBe(7);
        expect( node[key_parent] ).toBe(14);
        expect( key_child in node ).toBe(false);
        expect( node[depthKeyName] ).toBe(3);
    });

    it('4th depth node 3', function() {
        const node = tree[0][key_child][0][key_child][1][key_child][0];
        expect( node[key_id] ).toBe(8);
        expect( node[key_parent] ).toBe(15);
        expect( key_child in node ).toBe(false);
        expect( node[depthKeyName] ).toBe(3);
    });

    it('4th depth node 4', function() {
        const node = tree[0][key_child][0][key_child][1][key_child][1];
        expect( node[key_id] ).toBe(9);
        expect( node[key_parent] ).toBe(15);
        expect( key_child in node ).toBe(false);
        expect( node[depthKeyName] ).toBe(3);
    });
});
