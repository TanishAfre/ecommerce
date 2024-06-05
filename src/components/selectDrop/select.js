import React, {useState} from "react";
import "../selectDrop/select.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Select = () => {

    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIten, setSelectedItem] = useState('All Catagories');



    const openSelect = () => {
        setIsOpenSelect(!isOpenSelect);
    }

    const closeSelect = (index, name) => {
        setSelectedIndex(index);
        setIsOpenSelect(false);
        setSelectedItem(name);
    }

    return (
        <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
            <div className="selectDropWrapper cursor position-relative">
                <span className="openSelect" onClick={openSelect} >{selectedIten}<ArrowDropDownIcon className="arrow" /></span>   
                {
                    isOpenSelect===true && 
                    <div className="selectDrop cursor">
                        <div className="searchField">
                            <input type="text" placeholder="Search here..."/>
                        </div>
                        <ul className="searchResults">
                            <li onClick={()=>closeSelect(0, 'All Catagory')} className={`${selectedIndex===0 ? 'active':''}`}>All Catagory</li>
                            <li onClick={()=>closeSelect(1, 'Milk And Dairy')} className={`${selectedIndex===1 ? 'active':''}`}>Milk And Dairy</li>
                            <li onClick={()=>closeSelect(2, 'Wine And Drinks')} className={`${selectedIndex===2 ? 'active':''}`}>Wine And Drinks</li>
                            <li onClick={()=>closeSelect(3, 'Cloths And Beaity')} className={`${selectedIndex===3 ? 'active':''}`}>Cloths And Beaity</li>
                            <li onClick={()=>closeSelect(4, 'Fresh Sea Food')} className={`${selectedIndex===4 ? 'active':''}`}>Fresh Sea Food</li>
                            <li onClick={()=>closeSelect(5, 'Vegetables')} className={`${selectedIndex===5 ? 'active':''}`}>Vegetables</li>
                            <li onClick={()=>closeSelect(6, 'Fruits')} className={`${selectedIndex===6 ? 'active':''}`}>Fruits</li>
                            <li onClick={()=>closeSelect(7, 'Iten 1')} className={`${selectedIndex===7 ? 'active':''}`}>Item 1</li>
                            <li onClick={()=>closeSelect(8, 'Iten 1')} className={`${selectedIndex===8 ? 'active':''}`}>Item 1</li>
                            <li onClick={()=>closeSelect(9, 'Iten 1')} className={`${selectedIndex===9 ? 'active':''}`}>Item 1</li>
                            <li onClick={()=>closeSelect(10, 'Iten 1')} className={`${selectedIndex===10 ? 'active':''}`}>Item 1</li>
                            <li onClick={()=>closeSelect(11, 'Iten 1')} className={`${selectedIndex===11 ? 'active':''}`}>Item 1</li>
                            <li onClick={()=>closeSelect(12, 'Iten 1')} className={`${selectedIndex===12 ? 'active':''}`}>Item 1</li>
                        </ul>
                    </div>
                }
            </div>
        </ClickAwayListener>
        
    );
}

export default Select;