const fetchProducts = (query) => {
  if (!query) throw new Error('You must provide an url');
  const END_POINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  return fetch(END_POINT)
  .then((res) => res.json())
  .catch(() => { throw new Error('You must provide an url'); });
};

module.exports = { fetchProducts };
