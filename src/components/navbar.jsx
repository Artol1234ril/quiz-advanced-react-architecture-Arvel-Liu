import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../Style/navbar.css';

export default function Navbar() {
  const { auth, logout } = useAuth();

  return (
    <nav className="navbar">

      <Link to="/products" className="navbar-logo">
        AR<span>SHP</span>
      </Link>

      <div className="navbar-right">

        <div className="navbar-links">
          <Link to="/products">Products</Link>
          <Link to="/checkout">Checkout</Link>   {/* ✅ changed from /wishlist */}
          <div className="navbar-cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-badge">{auth?.Totalitems || 0}</span>
          </div>
        </div>

        <span className="navbar-user">
          {auth?.user?.email || 'Guest'}
        </span>

        {auth?.isAuthenticated && (
          <button className="navbar-logout" onClick={logout}>
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}