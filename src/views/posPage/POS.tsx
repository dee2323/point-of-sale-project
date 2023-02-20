import React, { useState, useEffect, useContext } from 'react'
import './style.scss'
import Header from '../../components/common/Header'
import Cart from './Cart/Cart'

interface props {

}
export const POS: React.FC<props> = () => {
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
                    products

                </section>

            </main>
            <Cart />

        </>
    )
}
export default POS;
