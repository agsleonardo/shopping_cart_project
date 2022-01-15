const fetchProducts = (query) => {
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  return fetch(END_POINT)
  .then((res) => res.json())
  .catch(() => { throw new Error('You must provide an url'); });
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
