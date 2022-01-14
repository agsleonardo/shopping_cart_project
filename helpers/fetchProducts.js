const fetchProducts = (query) => {
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  if (!query) throw new Error('You must provide an url');
  return fetch(END_POINT)
  .then((res) => res.json())
  .catch((err) => console.log(err));
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
