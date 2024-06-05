import React, {useState} from "react";
import "../selectDrop/select.css"

const Select = () => {

    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);


    const openSelect = () => {
        setIsOpenSelect(!isOpenSelect);
    }

    const closeSelect = (index) => {
        setSelectedIndex(index);
        setIsOpenSelect(false);
    }

    return (
        <div className="selectDropWrapper cursor position-relative">
            <span className="openSelect" onClick={openSelect} >All Catagories</span>   
            {
                isOpenSelect===true && 
                <div className="selectDrop cursor">
                    <div className="searchField">
                        <input type="text" />
                    </div>
                    <ul className="searchResults">
                        <li onClick={()=>closeSelect(0)} className={`${selectedIndex===0 ? 'active':''}`}>All Catagory</li>
                        <li onClick={()=>closeSelect(1)} className={`${selectedIndex===1 ? 'active':''}`}>Milk And Dairy</li>
                        <li onClick={()=>closeSelect(2)} className={`${selectedIndex===2 ? 'active':''}`}>Wine And Drinks</li>
                        <li onClick={()=>closeSelect(3)} className={`${selectedIndex===3 ? 'active':''}`}>Cloths And Beaity</li>
                        <li onClick={()=>closeSelect(4)} className={`${selectedIndex===4 ? 'active':''}`}>Fresh Sea Food</li>
                        <li onClick={()=>closeSelect(5)} className={`${selectedIndex===5 ? 'active':''}`}>Vegetables</li>
                        <li onClick={()=>closeSelect(6)} className={`${selectedIndex===6 ? 'active':''}`}>Fruits</li>
                        <li onClick={()=>closeSelect(7)} className={`${selectedIndex===7 ? 'active':''}`}>Item 1</li>
                        <li onClick={()=>closeSelect(8)} className={`${selectedIndex===8 ? 'active':''}`}>Item 1</li>
                        <li onClick={()=>closeSelect(9)} className={`${selectedIndex===9 ? 'active':''}`}>Item 1</li>
                        <li onClick={()=>closeSelect(10)} className={`${selectedIndex===10 ? 'active':''}`}>Item 1</li>
                        <li onClick={()=>closeSelect(11)} className={`${selectedIndex===11 ? 'active':''}`}>Item 1</li>
                        <li onClick={()=>closeSelect(12)} className={`${selectedIndex===12 ? 'active':''}`}>Item 1</li>
                    </ul>
                </div>
            }
        </div>
        
    );
}

export default Select;