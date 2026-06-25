import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../../utils/mock-data";
import { tax_rate, formatRp } from "../../utils/helpers";
import ProductCard from "../../components/ProductCard";
import CartItem from "../../components/CartItem";

function CashierMainPage({ onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * tax_rate;
  const total = subtotal + tax;
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increase = (id) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );

  const decrease = (id) =>
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });

  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Headbar */}
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2"></div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Cashier</span>
          <button
            onClick={onLogout}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Left: Products */}
        <section className="flex-1 flex flex-col p-5 gap-4 overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
            <input
              type="text"
              placeholder="Search item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-blue-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-auto pb-2">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))
            ) : (
              <p className="text-gray-400 text-sm col-span-full text-center pt-10">
                No items found.
              </p>
            )}
          </div>
        </section>

        {/* Right: Cart */}
        <aside className="w-80 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
          {/* Cart header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">
              Order
              {itemCount > 0 && (
                <span className="ml-2 text-xs bg-blue-500 text-white rounded-full px-2 py-1">
                  {itemCount}
                </span>
              )}
            </h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-400 hover:text-red-500 transition"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-6">
                <span className="text-4xl">🛒</span>
                <p className="font-semibold text-gray-600 text-sm">
                  No items added yet
                </p>
                <p className="text-xs text-gray-400">
                  Tap a product to add it here
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={increase}
                  onDecrease={decrease}
                  onRemove={remove}
                />
              ))
            )}
          </div>

          {/* Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-5 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium text-gray-700">
                  {formatRp(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax (11%)</span>
                <span className="font-medium text-gray-700">
                  {formatRp(tax)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-blue-600 text-lg">
                  {formatRp(total)}
                </span>
              </div>
              <button
                onClick={() => alert("Payment confirmed!")}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition"
              >
                Charge {formatRp(total)}
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default CashierMainPage;
