import React, { useState, useEffect } from "react";
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
    name: "32A Double Pole MCB C-Curve Switchgear",
    category: "Switchgear & MCBs",
    brand: "Aura Guard",
    priceB2C: 450,
    priceB2B: 320,
    moq: 10,
    stock: 85,
    rating: 4.9,
    reviewsCount: 19,
    specs: "10kA breaking capacity, ISI marked, IEC 60898-1 certified.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PROD-003",
    name: "18W Ultra-Slim Recessed LED Panel Light",
    category: "LED Lighting",
    brand: "Aura Lume",
    priceB2C: 380,
    priceB2B: 245,
    moq: 12,
    stock: 200,
    rating: 4.7,
    reviewsCount: 52,
    specs: "Cool Daylight (6500K), Surge Protection up to 2.5kV, 2-Year Warranty.",
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "PROD-004",
    name: "Smart Touch Switch Board (4 Node Wi-Fi)",
    category: "Smart Home",
    brand: "Aura Smart",
    priceB2C: 2200,
    priceB2B: 1650,
    moq: 2,
    stock: 45,
    rating: 4.6,
    reviewsCount: 14,
    specs: "Glass Touch Panel, Compatible with Alexa & Google Assistant, No Hub required.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"
  }
];

export default function App() {
  const [view, setView] = useState("storefront"); // storefront | dashboard
  const [userMode, setUserMode] = useState("B2C"); // B2C | B2B
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: "ORD-9821",
      customerName: "Sharma Electrical Contractors",
      phone: "+91 98765 43210",
      email: "sharma.elec@gmail.com",
      address: "Plot 42, Industrial Area Phase 2",
      city: "Faridabad, Haryana",
      gstin: "06AABCU9603R1ZM",
      type: "B2B",
      items: [
        { id: "PROD-001", name: "Aura Core 2.5sqmm Wire", qty: 10, price: 1420 },
        { id: "PROD-002", name: "32A Double Pole MCB", qty: 20, price: 320 }
      ],
      totalAmount: 20600,
      createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      status: "Awaiting Confirmation",
      confirmedAt: null
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", gstin: "", notes: ""
  });

  // Calculate Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = userMode === "B2B" ? item.priceB2B : item.priceB2C;
    return sum + unitPrice * item.qty;
  }, 0);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      }
      return [...prev, { ...product, qty }];
    });
    setIsCartOpen(true);
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: checkoutForm.name,
      phone: checkoutForm.phone,
      email: checkoutForm.email,
      address: checkoutForm.address,
      city: checkoutForm.city,
      gstin: checkoutForm.gstin,
      type: userMode,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        qty: item.qty,
        price: userMode === "B2B" ? item.priceB2B : item.priceB2C
      })),
      totalAmount: cartSubtotal,
      createdAt: new Date().toISOString(),
      status: "Awaiting Confirmation"
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCheckoutOpen(false);
    alert(`Order Placed Successfully! Order ID: ${newOrder.id}. We will call you within 12 hours to confirm payment.`);
  };

  const markConfirmed = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: "Confirmed", confirmedAt: new Date().toISOString() } : o));
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pendingOrders = orders.filter(o => o.status === "Awaiting Confirmation");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Banner - Customer Promise */}
      <div className="bg-amber-500 text-slate-900 px-4 py-2 text-xs md:text-sm font-semibold flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>Customer Promise: Orders will be verified & confirmed by phone within 12 hours.</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Direct Support: +91 98000 12345</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("storefront")}>
              <div className="p-2 bg-amber-500 text-slate-900 rounded-lg font-bold">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">AURA ELECTRICALS</h1>
                <p className="text-xs text-amber-400 font-medium tracking-wide">INDUSTRIAL & RETAIL SUPPLIES</p>
              </div>
            </div>

            {/* Cart Icon Mobile */}
            <button onClick={() => setIsCartOpen(true)} className="md:hidden relative p-2 text-slate-200">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>
          </div>

          {/* Mode Switcher & View Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="bg-slate-800 p-1 rounded-lg flex text-xs font-semibold">
              <button
                onClick={() => setUserMode("B2C")}
                className={`px-3 py-1.5 rounded-md transition ${userMode === "B2C" ? "bg-amber-500 text-slate-900" : "text-slate-300 hover:text-white"}`}
              >
                Individual
              </button>
              <button
                onClick={() => setUserMode("B2B")}
                className={`px-3 py-1.5 rounded-md transition ${userMode === "B2B" ? "bg-amber-500 text-slate-900" : "text-slate-300 hover:text-white"}`}
              >
                Retailer / B2B
              </button>
            </div>

            <button
              onClick={() => setView(view === "storefront" ? "dashboard" : "storefront")}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              {view === "storefront" ? "Owner Dashboard" : "Back to Store"}
              {pendingOrders.length > 0 && (
                <span className="bg-red-500 text-white rounded-full px-1.5 text-[10px]">{pendingOrders.length}</span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex items-center gap-2 bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-400 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-slate-900 text-white px-2 py-0.5 rounded-full text-xs">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* VIEW: STOREFRONT */}
      {view === "storefront" && (
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-10 text-white mb-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold mb-3">
                {userMode === "B2B" ? "Trade Wholesale Mode Enabled" : "Direct Consumer Retail"}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3">
                Genuine Electrical Supplies with Direct Phone Confirmation.
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-6">
                Place your order online. No card required upfront. Our team verifies stock and calls you within 12 hours with exact delivery and payment terms.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400" /> 100% Original Brands</div>
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-amber-400" /> Express Freight</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-400" /> GST Billing Included</div>
              </div>
            </div>
          </div>

          {/* Filters & Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {["All", "Cables & Wires", "Switchgear & MCBs", "LED Lighting", "Smart Home"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search wires, MCBs, lights..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map(product => {
              const price = userMode === "B2B" ? product.priceB2B : product.priceB2C;
              const savings = product.priceB2C - product.priceB2B;

              return (
                <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 bg-slate-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                        {product.brand}
                      </span>
                    </div>
                    <div className="p-4">
                      <span className="text-[11px] text-amber-600 font-bold uppercase tracking-wider">{product.category}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">{product.specs}</p>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl font-extrabold text-slate-900">₹{price}</span>
                        {userMode === "B2B" && (
                          <span className="text-xs text-slate-400 line-through">₹{product.priceB2C}</span>
                        )}
                        <span className="text-[10px] text-slate-500">/ unit</span>
                      </div>

                      {userMode === "B2B" && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded p-2 mb-3 text-[11px] text-emerald-800 font-semibold">
                          Save ₹{savings} per unit on bulk orders (MOQ: {product.moq} pcs)
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => addToCart(product, userMode === "B2B" ? product.moq : 1)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add to Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonial Placeholder */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Customer Reviews & Ratings</h3>
            <p className="text-xs text-slate-500 mb-6">Verified feedback from electrical contractors and homeowners.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs text-slate-700 italic mb-3">
                  "Ordered 20 bundles of wire for our project in Gurgaon. Received a call within 2 hours, payment was done via UPI after stock verification, and delivered next day."
                </p>
                <div className="text-xs font-bold text-slate-900">— Verified Trade Buyer (Haryana)</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-xs text-slate-700 italic mb-3">
                  "Extremely straightforward. No credit card hassles. They called, sent invoice on WhatsApp, and shipped immediately."
                </p>
                <div className="text-xs font-bold text-slate-900">— Verified Homeowner (New Delhi)</div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW: OWNER DASHBOARD */}
      {view === "dashboard" && (
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Store Owner Control Panel</h2>
              <p className="text-xs text-slate-500">Manage orders, update inventory, and confirm customer purchases.</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Live Store Active
              </span>
            </div>
          </div>

          {/* Pending Confirmation Alert Box */}
          {pendingOrders.length > 0 && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 mb-8 shadow-sm">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>{pendingOrders.length} New Order(s) Awaiting Confirmation (12-Hour Promise)</span>
              </div>
              <p className="text-xs text-amber-800 mb-4">
                Please call the customer(s) below to confirm stock, freight cost, and share bank/UPI details.
              </p>

              <div className="space-y-3">
                {pendingOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-lg border border-amber-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{order.id}</span>
                        <span className="bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">{order.type}</span>
                      </div>
                      <div className="text-xs text-slate-700 font-semibold mt-1">{order.customerName} ({order.phone})</div>
                      <div className="text-xs text-slate-500">{order.city} | Total: ₹{order.totalAmount}</div>
                    </div>
                    <button
                      onClick={() => markConfirmed(order.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Call Done & Mark Confirmed
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order History */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">
            <h3 className="font-bold text-slate-900 mb-4 text-sm">All Orders History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{order.id}</td>
                      <td className="p-3">{order.customerName}</td>
                      <td className="p-3">{order.phone}</td>
                      <td className="p-3 font-bold">₹{order.totalAmount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${order.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {order.status !== "Confirmed" && (
                          <button
                            onClick={() => markConfirmed(order.id)}
                            className="text-emerald-700 hover:underline font-bold text-xs"
                          >
                            Confirm Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-900 text-white">
              <h3 className="font-bold text-sm">Your Order Summary ({cart.length} items)</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">Your cart is currently empty.</div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="py-3 flex justify-between items-center gap-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                      <p className="text-[11px] text-slate-500">₹{userMode === "B2B" ? item.priceB2B : item.priceB2C} x {item.qty}</p>
                    </div>
                    <span className="font-bold text-xs text-slate-900">₹{(userMode === "B2B" ? item.priceB2B : item.priceB2C) * item.qty}</span>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-900 mb-4">
                  <span>Subtotal:</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <button
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs py-3 rounded-lg shadow"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Complete Order Details</h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 mb-4">
              <strong>No Immediate Payment Needed:</strong> We will review your items, confirm stock, and call you at the number below within 12 hours to provide payment details.
            </div>

            <form onSubmit={placeOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name / Firm Name *</label>
                <input
                  type="text"
                  required
                  value={checkoutForm.name}
                  onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  placeholder="e.g. Ramesh Electricals / Rajesh Kumar"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile / Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={checkoutForm.phone}
                  onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={2}
                  value={checkoutForm.address}
                  onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  placeholder="Street, Site Address, Landmark"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Location *</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.city}
                    onChange={e => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    placeholder="e.g. Faridabad"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GSTIN (Optional)</label>
                  <input
                    type="text"
                    value={checkoutForm.gstin}
                    onChange={e => setCheckoutForm({ ...checkoutForm, gstin: e.target.value })}
                    placeholder="06AABCU9603R1ZM"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg text-xs"
                >
                  Submit Order (Total: ₹{cartSubtotal})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
