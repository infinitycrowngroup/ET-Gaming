import { useState, useMemo, useEffect } from "react";
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

function RarityBadge({ rarity }) {
  const colors = {
    Common: "bg-gray-600",
    Uncommon: "bg-green-500",
    Rare: "bg-blue-500",
    Epic: "bg-red-600",
    Legendary: "bg-yellow-400 text-black",
  };
  return <span className={`text-xs px-2 py-1 rounded ${colors[rarity] || "bg-gray-500"}`}>{rarity}</span>;
}

export default function ShopGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios.get(`${API_BASE}/shop/items`).then(res => {
      if (!cancelled) setItems(res.data || []);
    }).catch(err => {
      console.error('Failed to fetch shop items:', err);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const categories = useMemo(() => ["All", ...new Set(items.map(i => i.category))], [items]);

  const filtered = useMemo(() => {
    let filteredItems = items.filter(i =>
      i.name.toLowerCase().includes(query.toLowerCase()) && (category === "All" || i.category === category)
    );
    if (sort === "price-asc") filteredItems = filteredItems.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filteredItems = filteredItems.sort((a, b) => b.price - a.price);
    if (sort === "rarity") filteredItems = filteredItems.sort((a, b) => b.rarity.localeCompare(a.rarity));
    return filteredItems;
  }, [query, category, sort]);

  function addToCart(item) {
    setCart(prev => [...prev, item]);
  }

  async function handleCheckout() {
    if (cart.length === 0) return alert('Cart is empty');
    try {
      const payload = { cart: cart.map(i => ({ id: i.id, qty: 1 })), customer: { name: 'Guest' } };
      const res = await axios.post(`${API_BASE}/shop/checkout`, payload);
      if (res.status === 201) {
        alert(`Order created: ${res.data.order.order_id} — total $${res.data.order.total}`);
        setCart([]);
      } else {
        alert('Checkout response: ' + JSON.stringify(res.data));
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. See console for details.');
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <div className="relative">
            <input
              aria-label="Search items"
              placeholder="Search items, e.g. Ne0n"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#0b0b0b] border border-gray-800 text-white w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-3 top-2 text-gray-400">⌕</span>
          </div>

          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-3 py-2 bg-[#0b0b0b] border border-gray-800 rounded-lg text-white">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 bg-[#0b0b0b] border border-gray-800 rounded-lg text-white">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rarity">Rarity</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-300">Cart: <span className="font-semibold text-white">{cart.length}</span></div>
          <button onClick={handleCheckout} disabled={cart.length === 0} className="px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-yellow-400 text-black font-bold disabled:opacity-50">
            Checkout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="relative p-4 rounded-2xl bg-gradient-to-br from-[#07101a] to-[#0d0d12] border border-gray-800 hover:scale-[1.02] transition transform shadow-lg" style={{ boxShadow: '0 6px 30px rgba(0,0,0,0.6)' }}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-white font-bold text-lg">{item.name}</h3>
              <RarityBadge rarity={item.rarity} />
            </div>
            <div className="h-40 rounded-xl mb-4 bg-gradient-to-tr from-[#111827] to-[#0f172a] flex items-center justify-center text-gray-400">
              {/* Placeholder image area — replace with assets for production */}
              <div className="text-center">
                <div className="text-3xl text-yellow-400/60">🎮</div>
                <div className="text-xs mt-2 text-gray-500">Preview</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xl font-extrabold text-white">${item.price.toFixed(2)}</div>
              <button onClick={() => addToCart(item)} className="px-3 py-1 rounded-lg bg-[#10b981] text-black font-semibold hover:scale-105 transition transform">Add</button>
            </div>

            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 opacity-20 blur-2xl"></div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-gray-400">No items match your search.</div>
      )}
    </div>
  );
}
