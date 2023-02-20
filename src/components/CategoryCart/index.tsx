import React from 'react'
import { category } from '../../types';
import './style.scss'
 interface props{
    title?:string;
    onClick:(category:category|undefined)=>void;
    isActive?:boolean;
    category?:category
}
const Category: React.FC <props>= ({title,category,isActive,onClick}) => {
    const className = isActive ? 'active' : '';
    console.log(className,'classname')
    return (
        <div className={`category ${className}`} onClick={() =>onClick(category) } >{title}</div>
    )
}

export default Category