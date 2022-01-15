const listCart = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const updatePrice = async () => {
  const labelPrice = document.querySelector('.total-price');
  const data = getSavedCartItems();
  const finalPrice = data.reduce((acc, cur) => acc + cur.salePrice, 0);
  labelPrice.innerText = finalPrice;
};

function cartItemClickListener(event) {
  listCart.removeChild(event.target);
  const data = getSavedCartItems();
  data.forEach((item, index) => (item.sku === event.target.id ? data.splice(index, 1) : ''));
  localStorage.setItem('cartItems', JSON.stringify(data));
  updatePrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.id = sku;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const spreadProducts = async () => {
  const { results } = await fetchProducts('computador');
  const container = document.querySelector('.items');
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    container.appendChild(createProductItemElement({ sku, name, image }));
  });
};

const clearCart = async () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', async () => {
    listCart.innerHTML = '';
    localStorage.setItem('cartItems', []);
    updatePrice();
  });
};

const addToCart = async () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((btn) => btn.addEventListener('click', async (ev) => {
    const itemId = ev.target.parentNode.querySelector('span.item__sku').innerText;
    const { id, title, price } = await fetchItem(itemId);
    const objItem = { sku: id, name: title, salePrice: price };
    const newItem = createCartItemElement(objItem);
    saveCartItems(objItem);
    listCart.appendChild(newItem);
    updatePrice();
  }));
};

const loadItens = () => {
  const savedItens = getSavedCartItems();
  savedItens.forEach(({ sku, name, salePrice }) => {
    listCart.appendChild(createCartItemElement({ sku, name, salePrice }));
  });
};

const init = async () => {
  await spreadProducts();
  loadItens();
  clearCart();
  addToCart();
  updatePrice();
};

window.onload = () => init();
