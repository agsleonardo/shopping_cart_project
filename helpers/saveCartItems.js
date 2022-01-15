const saveCartItems = (item) => {
  const toUpload = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')) : [];
  toUpload.push(item);
  localStorage.setItem('cartItems', JSON.stringify(toUpload));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
