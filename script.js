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

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

function cartItemClickListener(event) {
  listCart.removeChild(event.target);
  localStorage.setItem('cartItems', []);
  const arr = [...listCart.children];
  arr.forEach((item) => saveCartItems(item.outerHTML));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  console.log(li);
  return li;
}

const spreadProducts = async () => {
  const { results } = await fetchProducts('computador');
  const container = document.querySelector('.items');
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    container.appendChild(createProductItemElement({ sku, name, image }));
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
  addToCart();
};

window.onload = () => init();
