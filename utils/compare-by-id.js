module.exports = function compareById(vector, key) {
  return (a, b) => {
    const aid = Number(a[key]);
    const bid = Number(b[key]);
    if (aid > bid) {
      return vector ? 1 : -1;
    } else if (aid < bid) {
      return vector ? -1 : 1;
    } else {
      return 0
    }
  };
}
