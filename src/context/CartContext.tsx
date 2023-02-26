import { createContext, useState, useEffect } from "react";
import { products } from "../types";

interface CartProduct extends products {
    count: number;
}

interface valueInterface {
    cartProducts: CartProduct[];
    deleteFromCart: (id: string) => void;
    addToCart: (product: products) => void;
    decreaseCount: (id: string) => void;
    increaseCount: (id: string) => void,
    restTheCart: () => void,
    count: number,
}

interface props {
    children?: React.ReactNode;
}

export const cartContext = createContext<valueInterface | null>(null);

const CartProvider: React.FC<props> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData)
        {
            const parsedCartData: CartProduct[] = JSON.parse(cartData);
            setCartProducts(parsedCartData);
        }
    }, []);
    const count = cartProducts.length;
    const saveCartData = (cartData: CartProduct[]) => {
        localStorage.setItem("cart", JSON.stringify(cartData));
        setCartProducts(cartData);
    };

    const addToCart = (product: products) => {
        let count = 0;
        let updatedProduct: CartProduct = { ...product, count: 1 };

        cartProducts.forEach((item) => {
            if (item.id === product.id)
            {
                count++;
            }
        });

        if (count === 0)
        {
            const newCartData = [...cartProducts, { ...product, count: 1 }];
            saveCartData(newCartData);
        } else
        {
            const newCartData = cartProducts.map((item) => {
                if (item.id === product.id)
                {
                    updatedProduct = { ...item, count: item.count + 1 };
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            saveCartData(newCartData);
        }
    };

    const deleteFromCart = (id: string) => {
        const newCartData = cartProducts.filter((item) => item.id !== id);
        saveCartData(newCartData);
    };
    const increaseCount = (id: string) => {
        const newCartData = cartProducts.map(item => item.id !== id ? item : { ...item, count: item.count + 1 });
        saveCartData(newCartData);
    }
    const decreaseCount = (id: string) => {
        const item = cartProducts.find((item) => item.id === id);
        if (item && item.count - 1 > 0)
        {
            const product = cartProducts.find((item) => item.id === id);
            if (product)
            {
                const newCartData = cartProducts.map((item) => {
                    if (item.id === id)
                    {

                        return { ...item, count: item.count - 1 };
                    }
                    return item;
                });
                saveCartData(newCartData);
            }
        } else
        {
            deleteFromCart((id));
        }
    };

    const restTheCart = () => saveCartData([])
    return (
        <cartContext.Provider
            value={{
                cartProducts,
                addToCart,
                decreaseCount,
                deleteFromCart,
                increaseCount,
                restTheCart,
                count
            }}
        >
            {children}
        </cartContext.Provider>
    );
};

export default CartProvider;
