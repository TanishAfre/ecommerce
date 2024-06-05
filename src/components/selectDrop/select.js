import React, {useState} from "react";
import "../selectDrop/select.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


const Select = ({data, placeholder, icon}) => {

    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIten, setSelectedItem] = useState(placeholder);



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
                {icon}
                <span className="openSelect" onClick={openSelect} >{selectedIten}<ArrowDropDownIcon className="arrow" /></span>   
                {
                    isOpenSelect===true && 
                    <div className="selectDrop cursor">
                        <div className="searchField">
                            <input type="text" placeholder="Search here..."/>
                        </div>
                        <ul className="searchResults">
                        <li key={0} onClick={()=>closeSelect(0, placeholder)} className={`${selectedIndex===0 ? 'active':''}`}>{placeholder}</li>
                        {
                            data.map((item, index) => {
                                return (
                                    <li key={index+1} onClick={()=>closeSelect(index+1, item)} className={`${selectedIndex===index+1 ? 'active':''}`}>{item}</li>
                                )
                            })
                        }

                        </ul>
                    </div>
                }
            </div>
        </ClickAwayListener>
        
    );
}

export default Select;