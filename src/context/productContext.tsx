import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { products } from "../types";
interface valueInterface {
  products: products[],
  loading: boolean,
}
export const productsContext = createContext<valueInterface | null>(null);
interface props {
  children?: React.ReactNode;
}

const ProductContextProvider: React.FC<props> = ({ children }: props) => {
  const [products, setProducts] = useState<Array<products>>([]);
  const [loading, setLoading] = useState(false);


  const getProducts = async () => {
    setLoading(true)
    try
    {
      const response = await axios.get("https://pos-project-deema-default-rtdb.firebaseio.com/products/products.json/");
      

      if (response.data !== null)
      {
        const result = Object.keys(response.data).map((key) => {
          
          const product = response.data[key];
          

          if (product !== null)
          {
            product.id = key;
            return product;
          }
        });

        setProducts(result.filter((product) => product !== undefined));
        
      } else
      {
        setProducts([]);
      }
      setTimeout(() => { setLoading(false) }, 300)
    } catch (error)
    {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);



  const sampleAppContext: valueInterface = {

    products,
    loading,

  };

  return <productsContext.Provider value={sampleAppContext}>{children}</productsContext.Provider>
}
export default ProductContextProvider