import { createContext, useEffect, useState } from "react";
import http from "../lib/http.js";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await http("/products", {
        method: "GET"
      })

      if (response.success) {
        setProducts(response.results || [])
      } else {
        console.error("Backend error:", response.message)
      }
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <DataContext.Provider value={{ products, loading, refreshProducts: fetchProduct }}>
      {children}
    </DataContext.Provider>
  )
}