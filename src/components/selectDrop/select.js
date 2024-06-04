import React from "react";
import "../selectDrop/select.css"

const Select = () => {
    return (
        <div className="selectDrop cursor">
            <div className="searchField">
                <input type="text" />
                <ul>
                    <li>Milk And Dairy</li>
                    <li>Wine And Drinks</li>
                    <li>Cloths And Beaity</li>
                    <li>Fresh Sea Food</li>
                    <li>Vegetables</li>
                    <li>Fruits</li>
                </ul>
            </div>
        </div>
    );
}

export default Select;