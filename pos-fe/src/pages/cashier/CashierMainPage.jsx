import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../../utils/mock-data";
// import { tax_rate } from "../../utils/helpers";
import ProductCard from "../../components/ProductCard";

function CashierMainPage({ onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Headbar */}
      <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
        </div>
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

      {/* Products */}
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
    </div>
  );
}

export default CashierMainPage;
