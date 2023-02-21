import React, { useState, useContext } from 'react'
import Button from '../../components/common/Button'
import Header from '../../components/common/Header'
import TransitionsSnackbar from '../../components/common/loader'
import SearchInput from '../../components/common/Search'
import { productsContext } from '../../context/productContext'
import './style.scss'
import StickyHeadTable from './Table'
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

                <StickyHeadTable add={add} setAdd={setAdd} />
            </div>
            <TransitionsSnackbar load={sampleAppContext?.loading || false} />
        </div>
    )
}

export default Products