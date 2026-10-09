"use client"

import { useState, useEffect } from "react"
import { 
  ShoppingBag, Search, Filter, Plus, Minus, Trash2, 
  Coins, ShieldCheck, Truck, Clock, Pill, HeartPulse, 
  Sparkles, Check, ArrowRight, X, AlertCircle, FileText, 
  Upload, CheckCircle2, ChevronRight, Star
} from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  brand: string
  category: "antibiotics" | "pain" | "cardiac" | "diabetes" | "firstaid" | "vitamins" | "devices"
  price: number
  originalPrice: number
  discount: number
  unit: string
  rxRequired: boolean
  inStock: boolean
  description: string
  rating: number
  imageEmoji: string
}

const PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "Amoxicillin & Clavulanate (Augmentin)",
    brand: "GSK / Jan Aushadhi",
    category: "antibiotics",
    price: 120,
    originalPrice: 155,
    discount: 22,
    unit: "Strip of 10 Tablets (625mg)",
    rxRequired: true,
    inStock: true,
    description: "Broad-spectrum antibacterial therapy for throat, sinus, and respiratory infections.",
    rating: 4.8,
    imageEmoji: "💊"
  },
  {
    id: "p-2",
    name: "Dolo 650 (Paracetamol)",
    brand: "Micro Labs",
    category: "pain",
    price: 32,
    originalPrice: 42,
    discount: 24,
    unit: "Strip of 15 Tablets (650mg)",
    rxRequired: false,
    inStock: true,
    description: "Antipyretic and analgesic for fever, body ache, and headache relief.",
    rating: 4.9,
    imageEmoji: "🌡️"
  },
  {
    id: "p-3",
    name: "Pan-40 (Pantoprazole Sodium)",
    brand: "Alkem Laboratories",
    category: "pain",
    price: 85,
    originalPrice: 110,
    discount: 23,
    unit: "Strip of 10 Tablets (40mg)",
    rxRequired: false,
    inStock: true,
    description: "Proton pump inhibitor for acidity, GERD, and gastric protection.",
    rating: 4.7,
    imageEmoji: "🫧"
  },
  {
    id: "p-4",
    name: "Glycomet-500 (Metformin HCl)",
    brand: "USV Pharma",
    category: "diabetes",
    price: 48,
    originalPrice: 62,
    discount: 22,
    unit: "Strip of 20 Tablets (500mg)",
    rxRequired: true,
    inStock: true,
    description: "First-line oral antihyperglycemic medication for Type 2 Diabetes Mellitus.",
    rating: 4.8,
    imageEmoji: "🩸"
  },
  {
    id: "p-5",
    name: "Telma-40 (Telmisartan)",
    brand: "Glenmark Pharmaceuticals",
    category: "cardiac",
    price: 135,
    originalPrice: 175,
    discount: 23,
    unit: "Strip of 15 Tablets (40mg)",
    rxRequired: true,
    inStock: true,
    description: "Angiotensin receptor blocker (ARB) for blood pressure & hypertension management.",
    rating: 4.9,
    imageEmoji: "❤️"
  },
  {
    id: "p-6",
    name: "Becozinc (Multivitamin + Zinc)",
    brand: "Dr. Reddy's",
    category: "vitamins",
    price: 52,
    originalPrice: 65,
    discount: 20,
    unit: "Strip of 30 Capsules",
    rxRequired: false,
    inStock: true,
    description: "Essential Vitamin B-Complex, Vitamin C, and Zinc for immunity and nerve health.",
    rating: 4.9,
    imageEmoji: "✨"
  },
  {
    id: "p-7",
    name: "Emergency First Aid & Burn Dressing Kit",
    brand: "MedRelay Healthcare",
    category: "firstaid",
    price: 299,
    originalPrice: 420,
    discount: 28,
    unit: "Complete 18-Piece Trauma Kit",
    rxRequired: false,
    inStock: true,
    description: "Sterile gauze, bandage wraps, burn gel, antiseptic solution, micropore tape & CPR shield.",
    rating: 5.0,
    imageEmoji: "🩹"
  },
  {
    id: "p-8",
    name: "Digital Upper Arm Blood Pressure Monitor",
    brand: "Omron Healthcare",
    category: "devices",
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    unit: "Automatic Digital Device with LCD",
    rxRequired: false,
    inStock: true,
    description: "Clinically validated blood pressure & pulse monitor with irregular heartbeat detector.",
    rating: 4.9,
    imageEmoji: "🩺"
  },
  {
    id: "p-9",
    name: "Finger Pulse Oximeter (SpO2 & Pulse)",
    brand: "BPL Medical",
    category: "devices",
    price: 549,
    originalPrice: 899,
    discount: 38,
    unit: "Digital OLED Display Device",
    rxRequired: false,
    inStock: true,
    description: "Instant blood oxygen saturation and pulse rate monitor for respiratory tracking.",
    rating: 4.8,
    imageEmoji: "🫁"
  }
]

export default function PharmacyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [medCoins, setMedCoins] = useState(250)
  const [redeemCoins, setRedeemCoins] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState<any | null>(null)
  const [deliveryAddress, setDeliveryAddress] = useState("No. 14, Main Road, Villianur, Puducherry - 605110")
  const [attachedRx, setAttachedRx] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const storedCoins = localStorage.getItem("medrelay.coins")
    if (storedCoins) setMedCoins(parseInt(storedCoins))
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { product, quantity: 1 }]
    })
    showToast(`Added ${product.name} to Cart`)
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQ = item.quantity + delta
        return newQ > 0 ? { ...item, quantity: newQ } : null
      }
      return item
    }).filter(Boolean) as { product: Product; quantity: number }[])
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const deliveryFee = subtotal > 200 ? 0 : 30
  const coinDiscount = redeemCoins ? Math.min(medCoins, subtotal) : 0
  const total = Math.max(0, subtotal + deliveryFee - coinDiscount)
  const coinsEarnedFromOrder = 50

  const handlePlaceOrder = () => {
    if (cart.length === 0) return

    const orderId = `MR-${Math.floor(1000 + Math.random() * 9000)}`
    
    // Update coins (add 50 bonus coins and subtract redeemed coins)
    const newCoinsBalance = (redeemCoins ? medCoins - coinDiscount : medCoins) + coinsEarnedFromOrder
    setMedCoins(newCoinsBalance)
    localStorage.setItem("medrelay.coins", newCoinsBalance.toString())

    setOrderPlaced({
      orderId,
      items: cart,
      total,
      coinsEarned: coinsEarnedFromOrder,
      address: deliveryAddress,
      estimatedDelivery: "45 Minutes (Express Courier)",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })

    setCart([])
    setIsCartOpen(false)
  }

  const filteredProducts = PRODUCTS.filter(p => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 text-[#143827]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#143827] text-[#C6F052] px-4 py-2.5 rounded-2xl shadow-xl border border-[#C6F052]/30 text-xs font-bold animate-in fade-in slide-in-from-top-4">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E2E8D5] text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#143827] text-[#C6F052] flex items-center justify-center mx-auto text-3xl shadow-md">
              🎉
            </div>
            
            <div>
              <h3 className="text-2xl font-black text-[#143827]">Order Confirmed!</h3>
              <p className="text-xs text-[#5E806E] font-medium mt-1">
                Order ID: <span className="font-mono font-bold text-[#143827]">#{orderPlaced.orderId}</span>
              </p>
            </div>

            <div className="bg-[#F4F6EC] border border-[#E2E8D5] rounded-2xl p-4 text-xs text-left space-y-2">
              <div className="flex justify-between font-bold text-[#143827]">
                <span>Total Amount:</span>
                <span>₹{orderPlaced.total}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-800 bg-emerald-100/70 p-2 rounded-xl">
                <span>Coins Rewarded:</span>
                <span>+🪙 {orderPlaced.coinsEarned} MedCoins!</span>
              </div>
              <div className="pt-2 border-t border-[#E2E8D5] text-[11px] text-[#5E806E]">
                <p><strong>Delivery Address:</strong> {orderPlaced.address}</p>
                <p className="mt-1"><strong>ETA:</strong> {orderPlaced.estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/notifications"
                className="w-full py-3 bg-[#143827] text-white rounded-full font-bold text-xs hover:bg-[#0E2419] transition-all"
              >
                View in Notifications Inbox
              </Link>
              <button
                onClick={() => setOrderPlaced(null)}
                className="w-full py-2.5 bg-[#EBF0E4] text-[#143827] rounded-full font-bold text-xs hover:bg-[#E2E8D5] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Header & MedCoins Rewards Banner */}
      <div className="bg-gradient-to-r from-[#143827] via-[#1E4835] to-[#143827] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-[#C6F052] border border-white/15">
              <Coins size={14} />
              <span>Doorstep Delivery + Earn 50 Coins Per Order</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              MedRelay Pharmacy Store
            </h1>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Order generic &amp; branded medicines, first aid trauma kits, and health monitors directly to your home via Jan Aushadhi &amp; Govt PHC pharmacy network.
            </p>
          </div>

          {/* User MedCoins Card & Cart Trigger */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-left">
              <div className="text-[11px] text-white/70 font-semibold uppercase">Your Rewards</div>
              <div className="text-2xl font-black text-[#C6F052] flex items-center gap-1.5 mt-0.5">
                <Coins size={22} />
                <span>{medCoins}</span>
              </div>
              <div className="text-[10px] text-white/60">₹{medCoins} discount value</div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-4 bg-[#C6F052] text-[#143827] rounded-2xl font-black text-sm hover:bg-[#B5E03F] shadow-lg flex items-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag size={18} />
              <span>Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </button>
          </div>

        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5E806E] w-4 h-4" />
          <input
            type="text"
            placeholder="Search medicine by brand, salt, or symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E2E8D5] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#143827] focus:outline-none focus:ring-2 focus:ring-[#143827] font-medium shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-[#143827] text-white shadow-xs"
                : "bg-white text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5]"
            }`}
          >
            All Medicines
          </button>
          <button
            onClick={() => setSelectedCategory("antibiotics")}
            className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "antibiotics"
                ? "bg-[#143827] text-white shadow-xs"
                : "bg-white text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5]"
            }`}
          >
            💊 Antibiotics
          </button>
          <button
            onClick={() => setSelectedCategory("pain")}
            className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "pain"
                ? "bg-[#143827] text-white shadow-xs"
                : "bg-white text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5]"
            }`}
          >
            🌡️ Pain &amp; Fever
          </button>
          <button
            onClick={() => setSelectedCategory("firstaid")}
            className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "firstaid"
                ? "bg-[#143827] text-white shadow-xs"
                : "bg-white text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5]"
            }`}
          >
            🩹 First Aid Kits
          </button>
          <button
            onClick={() => setSelectedCategory("cardiac")}
            className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "cardiac"
                ? "bg-[#143827] text-white shadow-xs"
                : "bg-white text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5]"
            }`}
          >
            ❤️ Cardiac &amp; BP
          </button>
          <button
            onClick={() => setSelectedCategory("devices")}
            className={`px-3.5 py-2 rounded-full transition-all whitespace-nowrap ${
              selectedCategory === "devices"
                ? "bg-[#143827] text-white shadow-xs"
                : "bg-white text-[#143827] hover:bg-[#EBF0E4] border border-[#E2E8D5]"
            }`}
          >
            🩺 Medical Devices
          </button>
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-[#E2E8D5] rounded-3xl p-5 shadow-xs hover:shadow-md hover:border-[#143827] transition-all flex flex-col justify-between group"
          >
            <div>
              
              {/* Top Row: Category Emoji & Rx Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F6F8F0] text-2xl flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                  {p.imageEmoji}
                </div>
                
                <div className="flex items-center gap-1.5">
                  {p.rxRequired && (
                    <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                      Rx Required
                    </span>
                  )}
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {p.discount}% OFF
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-[#5E806E] uppercase tracking-wider">{p.brand}</p>
                <h3 className="font-bold text-sm text-[#143827] leading-snug">{p.name}</h3>
                <p className="text-xs text-[#5E806E]">{p.unit}</p>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </div>

            </div>

            {/* Price & Add to Cart Button */}
            <div className="mt-5 pt-3 border-t border-[#E2E8D5] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-[#143827]">₹{p.price}</span>
                  <span className="text-xs text-slate-400 line-through">₹{p.originalPrice}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">+50 Coins Reward</span>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="px-4 py-2 bg-[#143827] text-white hover:bg-[#0E2419] font-bold text-xs rounded-full shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              >
                <Plus size={14} className="text-[#C6F052]" />
                <span>Add</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Cart Slide-Over Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
          
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#E2E8D5] animate-in slide-in-from-right duration-200">
            
            {/* Cart Header */}
            <div className="p-5 border-b border-[#E2E8D5] flex items-center justify-between bg-[#F6F8F0]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#143827]" />
                <h3 className="font-bold text-base text-[#143827]">Your Medicine Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-[#5E806E]">
                  <ShoppingBag size={48} className="mx-auto mb-3 opacity-30 text-[#143827]" />
                  <p className="font-bold text-sm text-[#143827]">Your cart is empty</p>
                  <p className="text-xs mt-1">Add prescribed medicines or first aid kits from the store!</p>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl border border-[#E2E8D5] bg-[#F6F8F0] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{product.imageEmoji}</span>
                      <div>
                        <h4 className="font-bold text-xs text-[#143827] line-clamp-1">{product.name}</h4>
                        <p className="text-[11px] text-[#5E806E]">₹{product.price} each</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white border border-[#E2E8D5] rounded-full px-2 py-0.5 text-xs font-bold">
                        <button onClick={() => updateQuantity(product.id, -1)} className="text-slate-500 hover:text-[#143827]">
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, 1)} className="text-slate-500 hover:text-[#143827]">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product.id)} className="text-rose-500 hover:text-rose-700 p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Delivery Address Box */}
              {cart.length > 0 && (
                <div className="bg-white border border-[#E2E8D5] rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#143827]">
                    <Truck size={14} className="text-[#143827]" />
                    <span>Home Delivery Address:</span>
                  </div>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#F6F8F0] border border-[#E2E8D5] rounded-xl p-2.5 text-xs text-[#143827] font-medium focus:ring-2 focus:ring-[#143827]"
                  />
                  <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={11} /> 2-Hour Express Delivery via Villianur Jan Aushadhi Hub
                  </p>
                </div>
              )}

              {/* Redeem MedCoins Discount Toggle */}
              {cart.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Coins size={20} className="text-emerald-700" />
                    <div>
                      <span className="font-bold text-emerald-950">Redeem MedCoins</span>
                      <p className="text-[10px] text-emerald-800">You have {medCoins} Coins (Save ₹{Math.min(medCoins, subtotal)})</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setRedeemCoins(!redeemCoins)}
                    className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                      redeemCoins ? "bg-emerald-700 text-white shadow-xs" : "bg-white text-emerald-800 border border-emerald-300"
                    }`}
                  >
                    {redeemCoins ? "Applied ✓" : "Apply Coins"}
                  </button>
                </div>
              )}

            </div>

            {/* Cart Footer & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E2E8D5] bg-[#F6F8F0] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery:</span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  {redeemCoins && (
                    <div className="flex justify-between font-bold text-emerald-700">
                      <span>MedCoins Discount:</span>
                      <span>-₹{coinDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-sm text-[#143827] pt-2 border-t border-[#E2E8D5]">
                    <span>Total Amount:</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-700 text-right">
                    🎉 +50 MedCoins will be added on this order!
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3.5 bg-[#143827] text-white hover:bg-[#0E2419] rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Place Order (Pay on Delivery / UPI)</span>
                  <ArrowRight size={14} className="text-[#C6F052]" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

