import React, { useState, useEffect, useContext } from 'react'

import ProductCard from '../../components/productCard'
import './style.scss'
import { category, products } from '../../types'
import Cart from './Cart/Cart'
import Header from '../../components/common/Header'

import { productsContext } from '../../context/productContext'
interface props {

}
export const POS: React.FC<props> = () => {
    const sampleProductsContext = useContext(productsContext)

    const products = (sampleProductsContext?.products)
    console.log(products, 'ppp')
    return (

        <>
            <main className="main-section">
                <Header />

                <h2>choose category</h2>

                <section className="category-section">

                    categories
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
