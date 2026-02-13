import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  carts: {},
  orders: {}
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { email, item } = action.payload

      if (!state.carts[email]) {
        state.carts[email] = []
      }

      state.carts[email].push(item)
    },

    removeFromCart: (state, action) => {
      const { email, index } = action.payload

      if (state.carts[email]) {
        state.carts[email].splice(index, 1)
      }
    },

    clearCart: (state, action) => {
      const email = action.payload

      if (state.carts[email]) {
        state.carts[email] = []
      }
    },

    addOrder: (state, action) => {
        const {email, order} = action.payload

        if (!state.orders) {
            state.orders = {}
        }
        if (!state.orders[email]){
            state.orders[email]=[]
        }
        state.orders[email].push(order)
    }
  }
})

export const { addToCart, removeFromCart, clearCart, addOrder } = cartSlice.actions
export default cartSlice.reducer
