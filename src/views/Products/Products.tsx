import React, { useState, useContext } from 'react'
import Button from '../../components/common/Button'
import Header from '../../components/common/Header'
import TransitionsSnackbar from '../../components/common/loader'
import SearchInput from '../../components/common/Search'
import { productsContext } from '../../context/productContext'
import './style.scss'
import { ProductColumn } from '../../types'
import StickyHeadTable from '../../components/common/Table'
const columns: readonly ProductColumn[] = [
    { id: 'image', label: 'Image', minWidth: 80 },
    { id: 'title', label: 'Name', minWidth: 80 },
    { id: 'price', label: 'Price', minWidth: 80 },
    { id: 'category', label: 'Category', minWidth: 80 },
];
const Products: React.FC = () => {
    const sampleAppContext = useContext(productsContext)
    const [add, setAdd] = useState(false)  
    return (
        <div>
            <Header />
            <div className='input' >
                <Button text='Add Product' onClick={() => { setAdd(true) }} />
                <SearchInput type="product" />
            </div>

            <div className='table'>

                <StickyHeadTable add={add} setAdd={setAdd} items={sampleAppContext?.products!}
                handleDeleting={sampleAppContext?.handleDeletingproduct!}
                message="no products to show!"
                columns={columns}
                type="products"
                />
            </div>
            <TransitionsSnackbar load={sampleAppContext?.loading || false} />
        </div>
    )
}

export default Products