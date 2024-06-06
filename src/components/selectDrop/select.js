import React, {useState} from "react";
import "../selectDrop/select.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


const Select = ({data, placeholder, icon}) => {

    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(placeholder);

    const [listData, setListData] = useState(data);
    const [listData2, setListData2] = useState(data);

    const openSelect = () => {
        setIsOpenSelect(!isOpenSelect);
    }

    const closeSelect = (index, name) => {
        setSelectedIndex(index);
        setIsOpenSelect(false);
        setSelectedItem(name);
    }

    const FilterList = (e) => {
        const keyword = e.target.value.toLowerCase();
        //console.log(keyword);
        
        const list = listData2.filter((item) => {
            return item.toLowerCase().includes(keyword);
        });

        const list2 = list.filter((item,index)=> list.indexOf(item) === index);

        //console.log(list);
        setListData(list2);
    }

    return (
        <ClickAwayListener onClickAway={() => setIsOpenSelect(false)}>
            <div className="selectDropWrapper cursor position-relative">
                {icon}
                <span className="openSelect" onClick={openSelect} >{selectedItem.length>14 ? selectedItem.substr(0,14)+'...' : selectedItem}<ArrowDropDownIcon className="arrow" /></span>   
                {
                    isOpenSelect===true && 
                    <div className="selectDrop cursor">
                        <div className="searchField">
                            <input type="text" placeholder="Search here..." onChange={FilterList}/>
                        </div>
                        <ul className="searchResults">
                        <li key={0} onClick={()=>closeSelect(0, placeholder)} className={`${selectedIndex===0 ? 'active':''}`}>{placeholder}</li>
                        {
                            listData.map((item, index) => {
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