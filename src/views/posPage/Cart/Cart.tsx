import React from 'react'
import Button from '../../../components/common/Button'
import './style.scss'

const Cart: React.FC = () => {
    return (
        <section className="cart-section">
            <div className='header'>
                <h3>custormers order</h3>

            </div>
            <div className='items-section'>
                <ul>
                    <li className="item"><span className="item-image">
                        <img src='./images/shopImage.jpg' height='45rem' width='45rem' /> </span><span className="head">{'title'}</span><span className="item-price">${'price'}</span>
                        <i className="fas fa-regular fa-trash"></i>
                    </li >
                    <li className="item"><span className="item-image">
                        <img src='./images/shop.jpg' height='45rem' width='45rem' /> </span><span className="head">{'title'}</span><span className="item-price">${'price'}</span>
                        <i className="fas fa-regular fa-trash"></i>
                    </li >
                    <li className="item"><span className="item-image">
                        <img src='./images/shop.jpg' height='45rem' width='45rem' /> </span><span className="head">{'title'}</span><span className="item-price">${'price'}</span>
                        <i className="fas fa-regular fa-trash"></i>
                    </li >


                </ul>
            </div>
            <div className='order'>
                <p>total price</p>
                {/* <p>total price</p> */}
                <Button text='order' onClick={() => { }} />
            </div>
        </section>
    )
}

export default Cart