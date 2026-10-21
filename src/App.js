import React, { useState } from 'react';
import { 
  Zap, ShoppingBag, ShieldCheck, Truck, Phone, Search, Filter, CheckCircle, 
  Clock, AlertCircle, ShoppingCart, Lock, Plus, Edit, Trash2, ChevronRight, 
  UserCheck, DollarSign, RefreshCw, Star, Layers, Eye, FileText, Check, ArrowRight 
} from "lucide-react";

// Initial Products Data
const INITIAL_PRODUCTS = [
  {
    id: "PROD-001",
    name: "Aura Core 2.5sqmm Flexible Copper Wire (90m)",
    category: "Cables & Wires",
    brand: "Aura Core",
    priceB2C: 1850,
    priceB2B: 1420,
    moq: 5,
    stock: 120,
    rating: 4.8,
    reviewsCount: 34,
    specs: "Flame Retardant (FR), 100% Electrolytic Grade Copper, 1100V grade.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PROD-002",
    name: "Aura Modular 16A Smart Switch - Matte Black",
    category: "Switches & Sockets",
    brand: "Aura Switch",
    priceB2C: 320,
    priceB2B: 210,
    moq: 10,
    stock: 450,
    rating: 4.9,
    reviewsCount: 88,
    specs: "Wi-Fi enabled, Voice control compatible, High Surge Protection.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PROD-003",
    name: "Aura Industrial MCB Single Pole 32A C-Curve",
    category: "Circuit Protection",
    brand: "Aura Guard",
    priceB2C: 450,
    priceB2B: 310,
    moq: 12,
    stock: 200,
    rating: 4.7,
    reviewsCount: 19,
    specs: "10kA Breaking Capacity, IP20 Protection, IEC/EN 60898-1 Certified.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PROD-004",
    name: "Aura Lumina 18W Slim LED Panel Light (6500K)",
    category: "LED Lighting",
    brand: "Aura Lumina",
    priceB2C: 580,
    priceB2B: 390,
    moq: 8,
    stock: 310,
    rating: 4.6,
    reviewsCount: 52,
    specs: "Cool Day Light, High Surge 2.5kV, Aluminum Housing, 50,000 hrs lifespan.",
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=600&q=80"
  }
];

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [mode, setMode] = useState("B2C"); // "B2C" or "B2B"
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cables & Wires", "Switches & Sockets", "Circuit Protection", "LED Lighting"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const price = mode === "B2B" ? product.priceB2B : product.priceB2C;
    const minQty = mode === "B2B" ? product.moq : 1;
    
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, price, qty: minQty }]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-lg text-slate-950 font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">AURA ELECTRICALS</h1>
              <p className="text-xs text-slate-400">Industrial & Commercial Electrical Store</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setMode("B2C")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${mode === "B2C" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"}`}
            >
              Retail (B2C)
            </button>
            <button 
              onClick={() => setMode("B2B")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${mode === "B2B" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Wholesale (B2B)
            </button>
          </div>

          {/* Cart summary */}
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <ShoppingCart className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium">{cart.length} Items</span>
            <span className="text-sm font-bold text-amber-400 border-l border-slate-800 pl-2">₹{cartTotal.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-800 flex justify-between items-center">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${mode === "B2B" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"}`}>
              {mode === "B2B" ? "BULK PRICING APPLIED" : "STANDARD RETAIL STORE"}
            </span>
            <h2 className="text-2xl font-bold text-white">
              {mode === "B2B" ? "Wholesale Electrical Supplies for Contractors & Businesses" : "Premium Electrical Supplies & Hardware"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {mode === "B2B" ? "Tiered bulk pricing active. Minimum order quantities apply." : "Fast delivery, genuine parts, and verified quality guarantees."}
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search wires, switches, breakers, lights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-amber-500 text-slate-200"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all ${selectedCategory === cat ? "bg-slate-800 border-amber-500 text-amber-400" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const currentPrice = mode === "B2B" ? product.priceB2B : product.priceB2C;
            return (
              <div key={product.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-slate-700 transition-all">
                <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-bold text-white mt-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{product.specs}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-end">
                    <div>
                      <span className="text-xs text-slate-500 block">{mode === "B2B" ? `MOQ: ${product.moq} units` : "Retail Price"}</span>
                      <span className="text-xl font-bold text-white">₹{currentPrice}</span>
                      {mode === "B2B" && <span className="text-xs text-slate-400 line-through ml-2">₹{product.priceB2C}</span>}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
