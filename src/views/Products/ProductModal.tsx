import React, { useContext, useState } from "react";
import '../../assets/styles/style.scss'
import { categoriesContext } from "../../context/CategoryContext";
import { productsContext } from "../../context/productContext";
import { category, products } from "../../types";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../config/firebase/firebase";
interface props {
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  edit: boolean
}
const Overlay: React.FC<props> = ({ setAdd, setEdit, id, edit }) => {
  const sampleAppContext = useContext(categoriesContext)
  const sampleProductsContext = useContext(productsContext)
  const [selectedOption, setSelectedOption] = useState(sampleAppContext?.categories[0]?.category || '')
  const initalInput: products = edit ?
    sampleProductsContext?.products.find((p: products) => p.id == id)! : {
      id: -2,
      title: '',
      price: 0,
      description: '',
      category: selectedOption,
      image: './images/shop.jpg',
      date: '',
      code: ''
    }
  const [input, setInput] = useState<products>(initalInput)
  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUpload = event.target.files?.[0]
    const imageRef = ref(storage, `images/${imageUpload?.name}+${new Date()}`);
    const snapshot = await uploadBytes(imageRef, imageUpload!);
    const url = await getDownloadURL(snapshot.ref);
    setInput({ ...input, image: url });

  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setInput({ ...input, category: event.target.value })
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const handleConfirm = () => {
    if (edit)
      sampleProductsContext?.handleUpdateProduct(id, input)
    else
      sampleProductsContext?.handleAddingProduct(input);
    handleCancel()
  }
  const handleCancel = () => { setAdd(false); setEdit(false) }
  return (<div className="overlay" id="overlay">
    <div className="confirm-box p">
      <h2 className="header">create product <span className="close"
        onClick={handleCancel} >x</span></h2>
      <form className="addProductForm" onSubmit={(e) => e.preventDefault()}>
        <label>title</label>
        <input placeholder="product title" onChange={(e) => handleChange(e)} name="title" value={input.title} />
        <label>price</label>
        <input placeholder="price" type='number' min="0" defaultValue='0'
          name='price'
          onChange={(e) => handleChange(e)} value={input.price} />
        <label>code</label>
        <input placeholder="code"
          name="code"
          onChange={(e) => handleChange(e)} value={input.code} />
        <label>category</label>
        {sampleAppContext?.categories.length ? <select name="category" value={selectedOption}
          onChange={(e) => {
            handleSelectChange(e);

          }} >
          {sampleAppContext?.categories.map((option: category) => (
            <option key={option.id} value={option.category}>
              {option.category}
            </option>
          ))}
        </select> : <input placeholder="category" name="category"
          value={input.category}
          onChange={(e) => handleChange(e)} />
        }
        <label>description</label>
        <input placeholder="description"
          name="description"
          value={input.description}
          onChange={(e) => handleChange(e)} />
        <label>image</label>
        <input placeholder="image" type='file' onChange={uploadFile} />

      </form>

      <div className="confirmBtns">
        <button id="cancelDeleting" style={{ marginRight: '1rem' }} onClick={handleCancel}>
          Cancel
        </button>
        <button id="confirmDeleting" style={{ backgroundColor: 'rgb(105, 146, 185)', color: 'white' }}
          onClick={handleConfirm}>Submit</button>
      </div>
    </div>
  </div >)
}
export default Overlay;