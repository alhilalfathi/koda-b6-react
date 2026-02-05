import { createContext, useEffect, useState } from "react";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = "https://raw.githubusercontent.com/alhilalfathi/koda-b6-react/refs/heads/main/src/data/data.json"
        const res = await fetch(url)
        const data = await res.json()

        setProducts(data)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [])

  return (
    <DataContext.Provider value={{ products, loading }}>
      {children}
    </DataContext.Provider>
  )
}