import Navbar from "./navbar"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import React from "react"
import '../Style/whistlist_summery.css'

export default function Wishlist() {
    const { auth, addToCart, removeFromCart, clearCart } = useAuth()
    const navigate = useNavigate()
    const cartItems = auth.cart || []

    React.useEffect(() => {
        if (!auth?.isAuthenticated) {
            navigate('/login')
        }
    }, [auth?.isAuthenticated, navigate])

    if (!auth?.isAuthenticated) return null

    return (
        <div className="wishlist-page">
            <Navbar />

            <div className="wishlist-header">
                <p className="wishlist-tag">Your Selection</p>
                <h1 className="wishlist-title">Checkout</h1>
                <p className="wishlist-subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="wishlist-empty">
                    <div className="wishlist-empty-icon">🛒</div>
                    <p>Your cart is empty. Go add some products!</p>
                </div>
            ) : (
                <div className="wishlist-content">

                    {/* LEFT — ITEMS */}
                    <div className="wishlist-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="wishlist-item">
                                <div className="wishlist-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="wishlist-item-info">
                                    <div className="wishlist-item-name">{item.name}</div>
                                    <div className="wishlist-item-price">Unit: ${item.price.toFixed(2)}</div>
                                    <div className="wishlist-item-subtotal">Subtotal: ${(item.price * item.qty).toFixed(2)}</div>
                                    <div className="qty-controls">
                                        <button className="qty-btn" onClick={() => removeFromCart(item)}>−</button>
                                        <span className="qty-num">{item.qty}</span>
                                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — SUMMARY BOX */}
                    <div className="wishlist-summary-box">
                        <div className="summary-box-title">Order Summary</div>
                        <div className="summary-box-row">
                            <span>Items</span>
                            <span>{auth.Totalitems}</span>
                        </div>
                        <div className="summary-box-row">
                            <span>Subtotal</span>
                            <span>${auth.costItems.toFixed(2)}</span>
                        </div>
                        <div className="summary-box-row">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-box-total">
                            <span>Total</span>
                            <span>${auth.costItems.toFixed(2)}</span>
                        </div>
                        <button className="btn-primary" onClick={() => navigate('/summary')}>  {/* ✅ changed from /summery */}
                            <span>Place Order →</span>
                        </button>
                        <button className="btn-secondary" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>

                </div>
            )}
        </div>
    )
}