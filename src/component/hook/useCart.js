import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, clearCart } from "../../redux/reducers/cartReducer"

export const useCart = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  const carts = useSelector((state) => state.cart.carts)

  if (!user) {
    alert("You need to login")
    return {
      cartItems: [],
      currentUser: null
    }
  }

  const cartItems = carts[user.email] || []

  const handleRemove = (index) => {
    dispatch(removeFromCart({
      email: user.email,
      index
    }))
  }

  const handleClearCart = () => {
    dispatch(clearCart(user.email))
  }

  return {
    cartItems,
    currentUser: user,
    handleRemove,
    clearCart: handleClearCart
  }
}
