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

function calculateCartSubtotal(cart) {
  return cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
}

function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);

  let discount = 0;

  if (promo === "SAVE10" && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  const delivery = subtotal <= 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal + delivery - discount,
  };
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
