import React, { useState, useContext } from 'react'
import ProductCard from '../../components/productCard'
import './style.scss'
import { category, products } from '../../types'
import Cart from './Cart/Cart'
import Header from '../../components/common/Header'

import { productsContext } from '../../context/productContext'
import { categoriesContext } from '../../context/CategoryContext'
import Category from '../../components/CategoryCart'
export const POS: React.FC = () => {
    const sampleProductsContext = useContext(productsContext)
    const sampleAppContext = useContext(categoriesContext);
    const [activeItem, setActiveItem] = useState<category | null>(null);
    const [isAllActive, setIsAllActive] = useState<boolean>(true);
    const [products, setProducts] = useState<products[] | undefined>(sampleProductsContext?.products)
    const handleClick = (category: category | undefined) => {
        setActiveItem(category || null);
        setIsAllActive(false);
        console.log(category, "category")
        const c = category?.category?.toLocaleLowerCase()
        console.log(c)
        setProducts(sampleProductsContext?.products.filter(product => { return product?.category?.toLowerCase() === c }
        ))
    };
    const handleAllClick = () => {
        setActiveItem(null);
        setIsAllActive(true);
        setProducts(sampleProductsContext?.products)
    };
    return (
        <>
            <main className="main-section">
                <Header />

                <h2>choose category</h2>

                <section className="category-section">
                    <Category title="All" onClick={handleAllClick} key={'all'} isActive={isAllActive} />
                    {sampleAppContext?.categories?.map((p: category) => <Category
                        title={p?.category} key={p.id} onClick={handleClick} isActive={activeItem === p} category={p}

                    />)
                    }
                </section>
                <div className='search' >
                    <input type="text" placeholder='search...' />
                </div>
                <section className="product-section">

                    {products?.length ? products.map((p: products) =>
                        <ProductCard image={p?.image} price={p?.price} title={p?.title} />)! : <div className='no-product'><img src='./images/no-product1.jpg' /></div>
                    }
                </section>

            </main>
            <Cart />
        </>
    )
}
export default POS;
