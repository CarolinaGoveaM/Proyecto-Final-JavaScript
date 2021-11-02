const addToShoppingCartButtons = document.querySelectorAll('.agregarAlCarrito');

addToShoppingCartButtons.forEach((agregarAlCarritoButton) => {
  agregarAlCarritoButton.addEventListener('click', agregarAlCarritoClicked);
});

const buttonComprar = document.querySelector('.buttonComprar');

buttonComprar.addEventListener('click', buttonComprarClicked);

const cartItemsContainer = document.querySelector(
  '.cartItemsContainer'
);

// AGREGAR AL CARRITO
function agregarAlCarritoClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  // LOCAL STORAGE
  saveToLocalStorage("cart", { itemTitle: itemTitle, itemPrice: itemPrice, itemImage: itemImage, itemAmount: 1 });

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

// AGREGAR ITEMS AL CARRITO
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = cartItemsContainer.getElementsByClassName(
    'cartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  // AGREGAR AL HTML
  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image d-block w-25">
                <p class="shopping-cart-item-title cartItemTitle text-truncate ml-3 mb-0">${itemTitle}</p>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;

  shoppingCartRow.innerHTML = shoppingCartContent;
  cartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.cartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

// ACTUALIZAR CARRITO
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );

    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );

    const cartItemQuantityElement = shoppingCartItem.querySelector(
      '.cartItemQuantity'
    );

    const cartItemQuantity = Number(
      cartItemQuantityElement.value
    );

    total = total + shoppingCartItemPrice * cartItemQuantity;
  });

  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function buttonComprarClicked() {
  cartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}