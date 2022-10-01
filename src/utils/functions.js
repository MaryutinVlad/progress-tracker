function findBoughtItem(list, target) {
  let counter = 0;

  for (let item of list) {
    if (item.name === target) {
      return counter;
    }
    counter++;
  }
}

export { findBoughtItem };