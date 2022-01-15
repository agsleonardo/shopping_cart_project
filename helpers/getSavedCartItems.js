const getSavedCartItems = () => {
  if (!localStorage.getItem('cartItems')) return [];
  return JSON.parse(localStorage.getItem('cartItems'));
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
