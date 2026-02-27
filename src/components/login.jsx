import React from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../Style/signin.css';

const initialState = {
  email: "",
  password: "",
  isAuthenticated: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: true, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, email: "", password: "" };
    default:
      return state;
  }
}

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate('/products');
    }
  }, [auth?.isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.email || !state.password) {
      dispatch({ type: "SET_ERROR", payload: "Please fill in all fields." });
      return;
    }
    if (state.password.length < 4) {
      dispatch({ type: "SET_ERROR", payload: "Password must be at least 4 characters." });
      return;
    }
    login(state.email);
  };

  return (
    <div className="login-page">
      <div>


        <div className="login-card">
          <p className="login-tag">Welcome back</p>
          <h1 className="login-title">Sign in to<br />your account</h1>
          <p className="login-subtitle">Access your cart and continue shopping.</p>


          {state.error && (
            <div className="login-error">{state.error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={state.email}
                onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={state.password}
                onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
              />
            </div>

            <button type="submit" className="login-btn">
              <span>Sign In →</span>
            </button>
          </form>

          <p className="login-hint">Use any email + password (4+ chars) to sign in.</p>
        </div>
      </div>
    </div>
  );
}