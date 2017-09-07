// require("util").inspect.defaultOptions.depth = null;

const LTT = require('../dist/list-to-tree');

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

describe('Big tree:', function() {

    var tree = null;
    var list = [];

    var key_id = 'id';

    var key_parent = 'parent';

    var key_child = 'child';

    beforeEach(function() {
        list = [
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

    it('Sort tree', function() {
      var ltt = new LTT(list, {
          key_id: key_id,
          key_parent: key_parent,
          key_child: key_child
      });
      ltt.sort(compareById(false));
      const json = ltt.GetTree();

      expect(json[0].id).toBe(10);
      expect(json[json.length-1].id).toBe(1);
      expect(json[1].child[0].id).toBe(8);
    });

});
