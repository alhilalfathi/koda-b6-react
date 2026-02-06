import { useState, useEffect } from "react"

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (!loggedUser){
        return alert("You need to login")
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const userCart = cart[loggedUser.email] || []

    setCurrentUser(loggedUser)
    setCartItems(userCart)
  }, [])

  const handleRemove = (index) => {
    if(!currentUser){
      return
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const updatedCart = [...cartItems]

    updatedCart.splice(index, 1)

    cart[currentUser.email] = updatedCart
    localStorage.setItem("cart", JSON.stringify(cart))

    setCartItems(updatedCart)
  }

  const clearCart = () => {
    if (!currentUser){
        return
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    cart[currentUser.email] = []
    localStorage.setItem("cart", JSON.stringify(cart))

    setCartItems([])
  }

  return {
    cartItems,
    currentUser,
    handleRemove,
    clearCart,
    setCartItems
  }
}
