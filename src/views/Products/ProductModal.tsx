import React, { useContext, useState } from "react";
import '../../assets/styles/style.scss'
import { categoriesContext } from "../../context/CategoryContext";
import { productsContext } from "../../context/productContext";
import { category, products } from "../../types";
import {
  ref,
  uploadBytes,
  getDownloadURL,
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
    sampleProductsContext?.products.find((p: products) => p.id === id)! : {
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
  const [loading, setLoading] = useState(false)
  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageUpload = event.target.files?.[0]
    const imageRef = ref(storage, `images/${imageUpload?.name}+${new Date()}`);
    setLoading(true)
    uploadBytes(imageRef, imageUpload!).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setInput((input) => {
          setLoading(false)
          return { ...input, image: url }
        });
      });
    });

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
        <input placeholder="product title" disabled={loading} onChange={(e) => handleChange(e)} name="title" value={input.title} />
        <label>price</label>
        <input placeholder="price" type='number' min="0" defaultValue='0'
          name='price'
          onChange={(e) => handleChange(e)} value={input.price} disabled={loading} />
        <label>code</label>
        <input placeholder="code"
          name="code" disabled={loading}
          onChange={(e) => handleChange(e)} value={input.code} />
        <label>category</label>
        {sampleAppContext?.categories.length ? <select name="category" value={selectedOption} disabled={loading}
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
          onChange={(e) => handleChange(e)} disabled={loading} />
        }
        <label>description</label>
        <input placeholder="description"
          name="description"
          value={input.description}
          disabled={loading}
          onChange={(e) => handleChange(e)} />
        {!edit ? <>
          <label>image</label>
          <input placeholder="image" type='file' onChange={uploadFile} /> </>
          : ''}

      </form>

      <div className={`confirmBtns`}>
        {loading && <div style={{ display: 'inline', color: 'green', fontWeight: '800' }}>image uploading</div>}
        <button id="cancelDeleting" disabled={loading}
          style={{ marginRight: '1rem', marginLeft: '2rem', opacity: loading ? .5 : 1 }} onClick={handleCancel}>
          Cancel
        </button>
        <button id="confirmDeleting" style={{ backgroundColor: 'rgb(105, 146, 185)', color: 'white', opacity: loading ? .5 : 1 }}
          onClick={handleConfirm} disabled={loading}>Submit</button>
      </div>
    </div>
  </div >)
}
export default Overlay;