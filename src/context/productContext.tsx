import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { products } from "../types";
interface valueInterface {
  products: products[],
  loading: boolean,
  handleAddingProduct: (product: products) => void,
  handleDeletingproduct?: (id: string) => void;
  handleUpdateProduct: (id: string, product: products) => void,
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
  const handleAddingProduct = async (product: products) => {
    await axios.post("https://pos-project-deema-default-rtdb.firebaseio.com/products/products.json",
      { ...product, id: products.length });
    getProducts();
  };

  const handleDeletingproduct = async (id: string) => {
    await axios.delete("https://pos-project-deema-default-rtdb.firebaseio.com/products/products/" + id + ".json");
    getProducts();
  };

  const handleUpdateProduct = async (id: string, product: products) => {
    await axios.patch(
      "https://pos-project-deema-default-rtdb.firebaseio.com/products/products/" + id + ".json",
      { ...product }
    );
    getProducts();
  };

  const sampleAppContext: valueInterface = {
    handleAddingProduct,
    products,
    loading,
    handleDeletingproduct,
    handleUpdateProduct,
  };

  return <productsContext.Provider value={sampleAppContext}>{children}</productsContext.Provider>
}
export default ProductContextProvider