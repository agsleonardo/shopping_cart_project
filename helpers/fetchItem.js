const fetchItem = (item) => {
  const END_POINT = `https://api.mercadolibre.com/items/${item}`;
  return fetch(END_POINT)
  .then((res) => res.json())
  .catch(() => { throw new Error('You must provide an url'); });
};

module.exports = { fetchItem };

