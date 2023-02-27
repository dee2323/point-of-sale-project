import React, { useContext, useState } from 'react';
import Button from '../../../components/common/Button';
import { cartContext } from '../../../context/CartContext';
import Order from './order';
import './style.scss';

const Cart: React.FC = () => {
    const sampleCartContext = useContext(cartContext);
    const [input, setInput] = useState({
        tax: 0,
        discount: 0,
    });
    const [show, setShow] = useState(false)

    const subTotalPrice = sampleCartContext?.cartProducts.reduce((total, num) => {
        return total + num.count * num.price;
    }, 0) || 0;

    const tax = input.tax / 100;
    const discount = input.discount / 100;
    const total = subTotalPrice * (1 + tax) * (1 - discount);

    const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, tax: parseFloat(e.target.value) });
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, discount: parseFloat(e.target.value) });
    };

    return (
        <section className="cart-section">
            <div className="header">
                <h3>custormers order</h3>
            </div>
            <div className="items-section">
                <ul>
                    {sampleCartContext?.cartProducts.length ? (
                        sampleCartContext?.cartProducts.map((p) => {
                            return (
                                <li className="item" key={p.id}>
                                    <span className="item-image">
                                        <img src={p.image} height="45rem" width="45rem" />{" "}
                                    </span>
                                    <div className="quntity-container">
                                        <span
                                            className="oparation"
                                            onClick={() =>
                                                sampleCartContext.decreaseCount(String(p.id))
                                            }
                                        >
                                            -
                                        </span>
                                        <span>{p.count}</span>
                                        <span
                                            className="oparation"
                                            onClick={() =>
                                                sampleCartContext.increaseCount(String(p.id))
                                            }
                                        >
                                            +
                                        </span>
                                    </div>
                                    <span className="item-price">${(p.price * p.count).toFixed(2)}</span>
                                    <i
                                        className="fas fa-regular fa-trash"
                                        onClick={() =>
                                            sampleCartContext.deleteFromCart(String(p.id))
                                        }
                                    />
                                </li>
                            );
                        })
                    ) : (
                        <div className="no-product">
                            <img src="./images/no-product1.jpg" />
                        </div>
                    )}
                </ul>
            </div>
            <div className="order">
                <form>
                    <div className="orderField">
                        <label>Sub Total</label>
                        <input disabled value={subTotalPrice.toFixed(2)} />
                    </div>
                    <div className="orderField">
                        <label>Tax (%)</label>
                        <input type="number" value={input.tax} onChange={handleTaxChange} min='0' />
                    </div>
                    <div className="orderField">
                        <label>Discount (%)</label>
                        <input
                            type="number"
                            value={input.discount}
                            onChange={handleDiscountChange}
                            min='0'
                        />
                    </div>
                    <div className="orderField last">
                        <label>Total</label>
                        <input disabled value={total.toFixed(2)} />
                    </div>
                </form>
                <Button text='order' onClick={() => {

                    if (sampleCartContext?.cartProducts && sampleCartContext?.cartProducts?.length > 0)
                    {
                        setShow(true)
                        setInput({
                            tax: 0,
                            discount: 0,
                        });
                        sampleCartContext?.restTheCart();
                    }
                }} />
            </div>
            {show && <Order setShow={setShow} />}
        </section>
    )
}

export default Cart