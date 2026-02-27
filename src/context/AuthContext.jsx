
import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext(null)

const initialState = {
  isAuthenticated: false,
  user: null,
  cart: [],
  Totalitems: 0,
  costItems: 0,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':

      return { ...state, isAuthenticated: true, user: { email: action.payload } }

    case 'LOGOUT':

      return { ...initialState }

case 'ADD_TO_CART': {
  const exists = state.cart.find(item => item.id === action.payload.id)

  if (exists) {
    const updatedCart = state.cart.map(item =>
      item.id === action.payload.id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
    return {
      ...state,
      cart: updatedCart,
      Totalitems: state.Totalitems + 1,

      costItems: updatedCart.reduce((sum, item) => sum + item.price * item.qty, 0)
    }
  } else {
    const newCart = [...state.cart, { ...action.payload, qty: 1 }]
    return {
      ...state,
      cart: newCart,
      Totalitems: state.Totalitems + 1,
      costItems: newCart.reduce((sum, item) => sum + item.price * item.qty, 0)
    }
  }
}

case 'REMOVE_FROM_CART': {
  const item = state.cart.find(item => item.id === action.payload.id)

  if (item.qty > 1) {
    const updatedCart = state.cart.map(i =>
      i.id === action.payload.id
        ? { ...i, qty: i.qty - 1 }
        : i
    )
    return {
      ...state,
      cart: updatedCart,
      Totalitems: state.Totalitems - 1,

      costItems: updatedCart.reduce((sum, item) => sum + item.price * item.qty, 0)
    }
  } else {
    const updatedCart = state.cart.filter(i => i.id !== action.payload.id)
    return {
      ...state,
      cart: updatedCart,
      Totalitems: state.Totalitems - 1,
      costItems: updatedCart.reduce((sum, item) => sum + item.price * item.qty, 0)
    }
  }
}

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        Totalitems: 0,
        costItems: 0
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [auth, dispatch] = useReducer(authReducer, initialState)

  const login = (email) => {
    dispatch({ type: 'LOGIN', payload: email })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
 
  return (
    <AuthContext.Provider value={{ auth, dispatch, login, logout, addToCart, removeFromCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext