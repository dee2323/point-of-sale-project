import React, { useContext } from "react";
import '../../../assets/styles/style.scss'
interface props {
    setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>,
    id: string,
    handleDeleting?: (id: string) => void
}
const Confirm: React.FC<props> = ({ setShowOverlay, id, handleDeleting = () => { } }: props) => {
    console.log(id)
    return (<div className="overlay" id="overlay">
        <div className="confirm-box">
            <h2 className="header">confirm delete<span className="close"
                onClick={() => setShowOverlay(false)
                } >x</span></h2>
            <div>
                <p>Are you sure delete this item?</p>
            </div>
            <div className="confirmBtns cbtn">
                <button id="cancelDeleting" style={{ marginRight: '0.5rem' }}
                    onClick={() => { setShowOverlay(false) }}>
                    Cancel
                </button>
                <button id="confirmDeleting" style={{ backgroundColor: 'rgb(105, 146, 185)', color: 'white' }}
                    onClick={() => {
                        handleDeleting(id);
                        setShowOverlay(false)
                    }}>
                    Delete</button>
            </div>
        </div>
    </div >)
}
export default Confirm;