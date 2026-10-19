function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, qty) {
  if (qty < 1) {
    throw new RangeError("Товара не может быть 0");
  }

  const existing = cart.find((p) => p.id === product.id);
  const currentQty = existing ? existing.quantity : 0;
  const updatedQty = currentQty + qty;

  if (product.stock < updatedQty) {
    throw new RangeError("Товара не может быть больше, чем есть на складе");
  }

  if (existing) {
    return cart.map((p) =>
      p.id === product.id ? { ...p, quantity: updatedQty } : p,
    );
  }

  return [...cart, { ...product, quantity: qty }];
}

function changeQuantity(cart, id, qty) {
  if (qty < 1) {
    throw new RangeError("Количество товара не может быть меньше 1");
  }

  const existing = cart.find((p) => p.id === id);

  if (!existing) {
    return cart;
  }

  if (existing.stock < qty) {
    throw new RangeError(
      "Количество товара не может быть больше, чем есть на складе",
    );
  }

  return cart.map((p) => (p.id === id ? { ...p, quantity: qty } : p));
}

function removeFromCart(cart, id) {
  return cart.filter((p) => p.id !== id);
}

function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
