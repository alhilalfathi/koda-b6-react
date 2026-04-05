import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, clearCart } from "../../redux/reducers/cartReducer"

export const useCart = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  const carts = useSelector((state) => state.cart.carts)

  const cartItems = user ? (carts[user.email] || []) : []

  const handleRemove = (index) => {
    if (user) {
      dispatch(removeFromCart({
        email: user.email,
        index
      }))
    }
  }

  const handleClearCart = () => {
    if (user) {
      dispatch(clearCart({ email: user.email }))
    }
  }

  return {
    cartItems,
    currentUser: user,
    handleRemove,
    clearCart: handleClearCart
  }
}