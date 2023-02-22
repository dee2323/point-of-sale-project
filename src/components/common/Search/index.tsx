import React, { useState, useContext, useEffect } from 'react'
import { categoriesContext } from '../../../context/CategoryContext'
import { productsContext } from '../../../context/productContext'
import './style.scss'
interface props {
    type: string
}
const SearchInput: React.FC<props> = ({ type }) => {
    const productContext = useContext(productsContext)
    const categoryContext = useContext(categoriesContext)
    const [input, setInput] = useState('')
    useEffect(() => {
        return () => {
            setInput('');
            // productContext?.setSearching(false)
            // categoryContext?.setSearching(false)
            // productContext?.clearSearch()
            // categoryContext?.clearSearch()
        }
    }, [])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
        // const searchTerm = event.target.value.trim();
        // if (searchTerm)
        // {
        //     type === 'product' ? productContext?.searchProducts(searchTerm) : categoryContext?.searchCategories(searchTerm);
        //     type === 'product' ? productContext?.setSearching(true) : categoryContext?.setSearching(true);
        // } else
        // {
        //     type === 'product' ? productContext?.clearSearch() : categoryContext?.clearSearch();
        // }
    }
    console.log(input, 'input')
    return (
        <input type='text' value={input} placeholder="search..." onChange={handleChange} />
    )
}
export default SearchInput