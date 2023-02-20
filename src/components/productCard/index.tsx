import React from 'react'
import Button from '../common/Button'
import './style.scss'

interface props {
    image: string,
    title: string,
    price: number
}
const ProductCard: React.FC<props> = ({ image = "./images/shopImage.jpg", title, price }: props) => {

    return (

        <div className="product">
            <img src={image} />
            <p className='title'>{title}<br />

                <span className='price'>
                    {/* <Button text="add to cart" onClick={() => { }} /> */}

                    ${price}</span>  </p>

        </div>

    )
}

export default ProductCard