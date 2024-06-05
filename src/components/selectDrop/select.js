import React, {useState} from "react";
import "../selectDrop/select.css"

const Select = () => {

    const [isOpenSelect, setIsOpenSelect] = useState(false);

    return (
        <div className="selectDropWrapper cursor position-relative">
            <span className="openSelect">All Catagories</span>   
            {
                isOpenSelect===true && 
                <div className="selectDrop cursor">
                    <div className="searchField">
                        <input type="text" />
                    </div>
                    <ul className="searchResults">
                        <li>Milk And Dairy</li>
                        <li>Wine And Drinks</li>
                        <li>Cloths And Beaity</li>
                        <li>Fresh Sea Food</li>
                        <li>Vegetables</li>
                        <li>Fruits</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                        <li>Item 1</li>
                    </ul>
                </div>
            }
        </div>
        
    );
}

export default Select;