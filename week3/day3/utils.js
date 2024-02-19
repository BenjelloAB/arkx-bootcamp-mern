function generateId() {
    return (
      products.reduce(
        (acc, curr) => (acc < curr.id ? curr.id : acc),
        products[0].id
      ) + 1
    );
  }
  
  function findProductID(pid) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === pid) return i;
    }
    return -1;
  }

  module.exports = {
    generateId,
    findProductID,
  }