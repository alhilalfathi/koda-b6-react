import { createContext, useEffect, useState, useCallback } from "react"
import http from "../../lib/http.js"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProduct = useCallback(async () => {
    setLoading(true)
    try {
      const response = await http("/products")

      if (response.success) {
        setProducts(response.results ?? [])
      } else {
        console.error("Backend error:", response.message)
      }
    } catch (err) {
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  return (
    <DataContext.Provider
      value={{
        products,
        loading,
        refreshProducts: fetchProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}