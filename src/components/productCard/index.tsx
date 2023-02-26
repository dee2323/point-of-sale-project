import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import { products } from '../../types'
import './style.scss'

interface props {
    image: string,
    title: string,
    price: number,
    product: products,
}
const ProductCard: React.FC<props> = ({ product, image = "./images/shopImage.jpg", title, price }: props) => {
    const sampleCartContext = useContext(cartContext)
    return (

        <div className="product">

            <img src={image} />
            <p className='title'>{title}<br />

                <span className='price'>
                    <button className='add' onClick={() => sampleCartContext?.addToCart(product)}>
                        <i className="fas fa-light fa-cart-arrow-down" /></button>
                    ${price}</span>  </p>

        </div>

    )
}

export default ProductCard