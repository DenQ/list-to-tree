const LTT = require('../dist/list-to-tree');

const key_id = 'id';
const key_parent = 'parent';
const key_child = 'child';
const list = [
  { id: 1, parent: 0 },
  { id: 2, parent: 0 },
  { id: 3, parent: 2 },
  { id: 4, parent: 3 },
  { id: 5, parent: 2 },
  { id: 6, parent: 1 },
  { id: 7, parent: 0 },
  { id: 8, parent: 7 },
  { id: 9, parent: 7 },
  { id: 10, parent: 8 },
  { id: 11, parent: 6 },
  { id: 12, parent: 0 },
];
const ltt = new LTT(list, {
  key_id,
  key_parent,
  key_child,
});

describe('Split', function() {

  it('Run method - split', function() {
    const collection = ltt.split(list);
    expect(collection.length).toBe(4);

    expect(collection[0][0].id).toBe(7);
    expect(collection[0][1].id).toBe(8);
    expect(collection[0][2].id).toBe(9);
    expect(collection[0][3].id).toBe(10);

    expect(collection[1][0].id).toBe(1);
    expect(collection[1][1].id).toBe(6);
    expect(collection[1][2].id).toBe(11);

    expect(collection[2][0].id).toBe(2);
    expect(collection[2][1].id).toBe(5);
    expect(collection[2][2].id).toBe(3);
    expect(collection[2][3].id).toBe(4);

    expect(collection[3][0].id).toBe(12);
  });

})
