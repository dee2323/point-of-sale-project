import React, { useState, useEffect, useContext } from 'react'
import Category from '../../components/CategoryCart'
import ProductCard from '../../components/productCard'
import './style.scss'
import { category, products } from '../../types'
import Cart from './Cart/Cart'
import Header from '../../components/common/Header'
import { categoriesContext } from '../../context/CategoryContext'
import { productsContext } from '../../context/productContext'
interface props {

}
export const POS: React.FC<props> = () => {
    const sampleAppContext = useContext(categoriesContext);
    const sampleProductsContext = useContext(productsContext)
    const [activeItem, setActiveItem] = useState<category | null>(null);
    const [isAllActive, setIsAllActive] = useState<boolean>(true);
    const [products, setProducts] = useState<products[] | undefined>(sampleProductsContext?.products)
    const [input, setInput] = useState('')
    const handleClick = (category: category | undefined) => {
        setActiveItem(category || null);
        setInput('')
        setIsAllActive(false);

        const c = category?.category?.toLocaleLowerCase()

        setProducts(sampleProductsContext?.products.filter(product => { return product?.category?.toLowerCase() === c }
        ))
    };
    const handleAllClick = () => {
        setInput('')
        setActiveItem(null);
        setIsAllActive(true);
        setProducts(sampleProductsContext?.products)
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)

        const searchTerm = e.target.value.trim()

        if (searchTerm !== '')
        {
            setProducts(products?.filter((product) => {
                const productName = product.title.toLowerCase();
                if (!isAllActive)
                {
                    return productName.includes(
                        searchTerm.toLowerCase())
                        && activeItem?.category?.toLowerCase() === product.category?.toLowerCase();
                }

                return productName.includes(searchTerm.toLowerCase())
            }))
        }
        else
        {
            !isAllActive ? setProducts(sampleProductsContext?.products?.
                filter(product => { return product?.category?.toLowerCase() === activeItem?.category?.toLowerCase() }))
                : setProducts(sampleProductsContext?.products)

        }

    }
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
                    <input type="text" placeholder='search...' value={input} onChange={(e) => handleChange(e)} />
                </div>
                <section className="product-section">
                    {products?.length ? products.map((p: products) =>
                        <ProductCard product={p}
                            image={p?.image} price={p?.price}
                            title={p?.title} />)! : <div className='no-product'><img src='./images/no-product1.jpg' /></div>
                    }
                </section>

            </main>
            <Cart />
        </>
    )
}
export default POS;
