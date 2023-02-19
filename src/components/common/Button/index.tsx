import React from 'react'
import './style.scss'
interface props {
    text: string;
    onClick: () => void
}
const Button: React.FC<props> = ({ text, onClick }: props) => {
    return (
        <button className='button' onClick={onClick}>{text}</button>
    )
}
export default Button;
