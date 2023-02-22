import React, { useContext, useState } from 'react'
import Button from '../../components/common/Button';
import Header from '../../components/common/Header';
import SearchInput from '../../components/common/Search';
import StickyHeadTable from './Table';
import './style.scss'
import { categoriesContext } from '../../context/CategoryContext';
import TransitionsSnackbar from '../../components/common/loader';

const Categories: React.FC = () => {
    const [add, setAdd] = useState(false);
    const sampleAppContext = useContext(categoriesContext)
    return (
        <div>
            <Header />
            <div className='input' >
                <Button text='Add Category' onClick={() => { setAdd(true) }} />
                <SearchInput type="category" />
            </div>

            <div className='table ctable'>

                <StickyHeadTable add={add} setAdd={setAdd} />

            </div>

            <TransitionsSnackbar load={sampleAppContext?.loading || false} />


        </div>

    )
}

export default Categories;