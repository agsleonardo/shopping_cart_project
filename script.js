const listCart = document.querySelector('.cart__items');

const improveImage = (url) => url.replace(/[I]/, 'W');

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

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(improveImage(image)));
  section.appendChild(createCustomElement('span', 'item__price', `$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

const loadStoredItems = () => JSON.parse(getSavedCartItems());

const updatePrice = async () => {
  const labelPrice = document.querySelector('.total-price');
  const data = loadStoredItems();
  labelPrice.innerText = data.reduce((acc, cur) => acc + cur.salePrice, 0).toFixed(2);
};

function cartItemClickListener({ target }) {
  target.remove();
  const data = loadStoredItems();
  data.forEach((item, index) => (item.sku === target.id ? data.splice(index, 1) : ''));
  localStorage.setItem('cartItems', JSON.stringify(data));
  updatePrice();
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.id = sku;
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name}
  <br><br><strong>PRICE: <span style="color:red">$${salePrice}</span></strong>`;
  li.style.backgroundImage = `url(${image})`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const spreadProducts = async () => {
  const { results } = await fetchProducts('computador');
  const container = document.querySelector('.items');
  results.forEach(({ id: sku, title: name, thumbnail: image, price }) => {
    container.appendChild(createProductItemElement({ sku, name, image, price }));
  });
  document.querySelector('.loading').remove();
};

const clearCart = async () => {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', async () => {
    listCart.innerHTML = '';
    localStorage.removeItem('cartItems');
    updatePrice();
  });
};

const addToCart = async () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((btn) => btn.addEventListener('click', async (ev) => {
    const toStore = JSON.parse(getSavedCartItems());
    const itemId = ev.target.parentNode.querySelector('span.item__sku').innerText;
    const { id, title, price, thumbnail } = await fetchItem(itemId);
    const objItem = { sku: id, name: title, salePrice: price, image: improveImage(thumbnail) };
    toStore.push(objItem);
    saveCartItems(JSON.stringify(toStore));
    const newItem = createCartItemElement(objItem);
    listCart.appendChild(newItem);
    updatePrice();
  }));
};

const spreadStoredItems = () => {
  const savedItens = loadStoredItems();
  savedItens.forEach(({ sku, name, salePrice, image }) => {
    listCart.appendChild(createCartItemElement({ sku, name, salePrice, image }));
  });
};

const init = async () => {
  await spreadProducts();
  spreadStoredItems();
  clearCart();
  addToCart();
  updatePrice();
};

window.onload = () => init();
