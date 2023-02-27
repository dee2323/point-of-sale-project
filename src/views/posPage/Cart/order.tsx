import React from 'react'
import '../../../assets/styles/style.scss'
interface props {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}
const Order = ({ setShow }: props) => {
    return (<div className="overlay" id="overlay">
        <div className="confirm-box">
            <span className="close" onClick={() => { setShow(false) }}>x</span>

            <p style={{ width: "100%", margin: 'auto', textAlign: 'center', fontSize: '2rem', color: 'rgb(11, 86, 184)' }} >
                <i className="fas fa-thin fa-circle-check"></i>your Order Done</p>
        </div>
    </div >)
}
export default Order;