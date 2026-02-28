import React from 'react'
import { useAuth } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import '../Style/product.css'


import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'

const products = [
  {
    id: 1,
    name: "JBL Live 770NC",
    price: 10.99,
    qty: 1,
    badge: "Bestseller",
    badgeRed: false,
    description: "Headphones with active noise cancellation and powerful sound.",
    image: "src/assets/image1.png"
  },
  {
    id: 2,
    name: "Azzor D9",
    price: 19.99,
    qty: 1,
    badge: "New",
    badgeRed: false,
    description: "Wireless Gaming Mouse with Many Colorful Lights.",
    image: "src/assets/image2.png"
  },
  {
    id: 3,
    name: "The Sony NW-A55 Walkman",
    price: 22.29,
    qty: 1,
    badge: "Popular",
    badgeRed: false,
    description: "High-Quality Digital Music Player with Long Battery Life.",
    image: "src/assets/image3.png"
  },
  {
    id: 4,
    name: "ASUS ROG Swift OLED",
    price: 39.99,
    qty: 1,
    badge: "Premium",
    badgeRed: true,
    description: "High-Performance Gaming Monitor with Stunning OLED Display.",
    image: "src/assets/image4.png"
  },
  {
    id: 5,
    name: "Logitech MX Keys S",
    price: 67.67,
    qty: 1,
    badge: "Top Pick",
    badgeRed: false,
    description: "Ergonomic Wireless Keyboard with Backlit Keys.",
    image: "src/assets/image5.png"
  }
]

export default function Product() {
  const { auth, addToCart } = useAuth()
  const navigate = useNavigate()
  const [addedIds, setAddedIds] = React.useState([])

  React.useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate('/login')
    }
  }, [auth?.isAuthenticated, navigate])

  if (!auth?.isAuthenticated) return null

  const handleAdd = (product) => {
    addToCart(product)
    setAddedIds(prev => [...prev, product.id])
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id))
    }, 1500)
  }

  return (
    <div className="products-page">
      <Navbar />

      {/* HEADER */}
      <div className="products-header">
        <p className="products-tag">Our Collection</p>
        <h1 className="products-title">Featured Products</h1>
        <p className="products-subtitle">Handpicked tech essentials for the discerning professional.</p>
      </div>

      {/* GRID WRAPPER centers everything, GRID locks to 3 columns */}
      <div className="products-grid-wrapper">
        <div className="products-grid">
          {products.map(product => {
            const isAdded = addedIds.includes(product.id)
            const inCart = auth.cart.find(i => i.id === product.id)

            return (
              <div key={product.id} className="product-card">

                {/* ✅ BADGE is above the image, not overlapping it */}
                <div className="product-badge-row">
                  {product.badge && (
                    <span className={`product-badge ${product.badgeRed ? 'red' : ''}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* IMAGE */}
                <div className="product-img-wrap">
                  <img src={product.image} alt={product.name} />
                </div>

                {/* BODY */}
                <div className="product-body">
                  <div className="product-name">{product.name}</div>
                  <div className="product-desc">{product.description}</div>
                  <div className="product-price-row">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <span className="product-currency">USD</span>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  className={`product-btn ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAdd(product)}
                >
                  <span>
                    {isAdded ? '✓ Added' : inCart ? `+ Add More (${inCart.qty})` : '+ Add to Cart'}
                  </span>
                </button>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}