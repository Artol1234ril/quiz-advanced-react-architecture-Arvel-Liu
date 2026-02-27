import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React, { useEffect } from "react"
import Navbar from "./navbar"
import '../Style/whistlist_summery.css'

export default function Summery() {
    const { auth, clearCart } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth?.isAuthenticated) {
            navigate('/login')
        }
    }, [auth?.isAuthenticated, navigate])

    if (!auth?.isAuthenticated) return null

    const pr = () => {
        clearCart()
        navigate('/products')
    }

    return (
        <div className="summary-page">
            <Navbar />

            <div className="summary-centered">

                <div className="summary-check-circle">✓</div>

                <h1 className="summary-confirm-title">Order<br />Confirmed!</h1>

                <p className="summary-confirm-sub">
                    Thank you <strong>{auth?.user?.email || 'Guest'}</strong>.<br />
                    Your order has been placed successfully.
                </p>

                <div className="summary-stats">
                    <div className="summary-stat">
                        <span className="stat-label">Items</span>
                        <span className="stat-value">{auth.Totalitems}</span>
                    </div>
                    <div className="summary-stat-divider" />
                    <div className="summary-stat">
                        <span className="stat-label">Total Paid</span>
                        <span className="stat-value red">${auth.costItems.toFixed(2)}</span>
                    </div>
                    <div className="summary-stat-divider" />
                    <div className="summary-stat">
                        <span className="stat-label">Status</span>
                        <span className="stat-value green">Processing</span>
                    </div>
                </div>

                <button className="summary-continue-btn" onClick={pr}>
                    <span>Continue Shopping →</span>
                </button>

            </div>
        </div>
    )
}