import { useFormik } from "formik";
import React, { useContext } from "react";
import '../../assets/styles/style.scss'
import { categoriesContext } from "../../context/CategoryContext";
import { category } from "../../types";
import * as Yup from 'yup'
interface props {
    setAdd: React.Dispatch<React.SetStateAction<boolean>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    edit: boolean
}
const Overlay: React.FC<props> = ({ setAdd, setEdit, id, edit }) => {
    const sampleAppContext = useContext(categoriesContext)
    const initalInput = edit ? sampleAppContext?.categories?.find((category: category) => category.id == id)?.category : ''

    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required')
    });
    const formik = useFormik({
        initialValues: {
            category: initalInput
        },
        onSubmit: (values) => {
            if (edit)
            {
                sampleAppContext?.handleUpdateCategory(id, values.category)
            } else
            {
                sampleAppContext?.handleAddingCategory(values.category || '');
            }
            handleCancel()
        },
        validationSchema,
    })

    const handleCancel = () => {
        setAdd(false);
        setEdit(false);
    }

    return (
        <div className="overlay" id="overlay">
            <div className="confirm-box">
                <h2 className="header">
                    {edit ? 'Edit category' : 'Create category'}
                    <span className="close" onClick={handleCancel}>x</span>
                </h2>
                <form className="addProductForm" onSubmit={(e) => e.preventDefault()}>
                    <label>Category</label>
                    <input
                        placeholder="Category title"
                        name='category'
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    />
                    <div className="confirmBtns">
                        <button
                            id="cancelDeleting"
                            style={{ marginRight: '0.5rem' }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            id="confirmDeleting"
                            type="submit"
                            onClick={() => formik.handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Overlay;
