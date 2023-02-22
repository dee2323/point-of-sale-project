import React, { useState, useContext } from "react";
import '../../assets/styles/style.scss'
import { categoriesContext } from "../../context/CategoryContext";
import { category } from "../../types";

interface props {
    setAdd: React.Dispatch<React.SetStateAction<boolean>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    edit: boolean
}
const Overlay: React.FC<props> = ({ setAdd, setEdit, id, edit }) => {
    const sampleAppContext = useContext(categoriesContext)
    const initalInput = edit ?
        sampleAppContext?.categories?.find((category: category) => category.id == id)?.category : ''
    const [input, setInput] = useState<string | undefined>(initalInput)

    const handleCancel = () => { setAdd(false); setEdit(false) }
    const handleConfirm = () => {
        if (edit)
            sampleAppContext?.handleUpdateCategory(id, input)
        else
            input && sampleAppContext?.handleAddingCategory(input);
        handleCancel()
    }
    return (<div className="overlay" id="overlay">
        <div className="confirm-box">
            <h2 className="header">
                create category <span className="close" onClick={handleCancel}>x</span></h2>
            <form className="addProductForm" onSubmit={(e) => e.preventDefault()} >
                <label>Category</label>
                <input placeholder="Category title" onChange={(e) => setInput(e.target.value)}
                    value={input} />
            </form>
            <div className="confirmBtns">
                <button id="cancelDeleting" style={{ marginRight: '0.5rem' }} onClick={handleCancel}>
                    Cancel
                </button>
                <button id="confirmDeleting" onClick={handleConfirm}>Submit</button>
            </div>
        </div>
    </div >)
}
export default Overlay;