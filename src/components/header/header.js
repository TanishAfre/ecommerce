import React, { useEffect, useState } from "react";
import "./header.css";
import Logo from "../../assets/images/ecommerceBrandLogo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../selectDrop/select"
import axios from "axios";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CompareIcon from '@mui/icons-material/Compare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiscountIcon from '@mui/icons-material/Discount';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


const Header = () => {

    const [isOpenDropDown, setIsOpenDropDown] = useState(false);

    const [catagories, setCatagories] = useState([ 
        'Milk And Dairy',
        'Wine And Drinks',
        'Cloths And Beaity',
        'Fresh Sea Food',
        'Vegetables',
        'Fruits',
        'Iten 1',
        'Iten 1',
        'Iten 1',
        'Iten 1',
        'Iten 1',
        'Iten 1'
    ]);

    const countryList=[];

    useEffect(() => {
        getCountry('https://countriesnow.space/api/v0.1/countries')
    }, []);

    const getCountry = async (url) => {
        try {
            await axios.get(url).then((res) => {
                if(res!==null){
                    //console.log(res.data.data);
                    res.data.data.map((item) => {
                        countryList.push(item.country);
                    });
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    

  return (
      <header>
        <div className="container-fluid">
            <div className="row">
                {/* Logo */}
                <div className="col-sm-1">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>

                {/* header search starts here */}
                <div className="col-sm-5 d-flex justify-content-center">
                    <div className="headerSearch d-flex align-item-center">
                        <Select data={catagories} placeholder={'All Catagory'} icon={false} />

                        <div className="searchBox">
                            <input type="text" placeholder="Search for fresh fruits or vegetables" />
                            <SearchIcon className="searchIcon cursor" />
                        </div>
                    </div>
                </div>
                {/* header search ends here */}

                <div className="col-sm-4 d-flex aligh-items-center">
                    <div className="ml-auto d-flex align-items-center rMost">
                        <div className="countryWrapper cursor position-relative">
                            <Select data={countryList} placeholder={'Your Location'} icon={<LocationOnOutlinedIcon style={{ opacity:'0.5' }}/>} />
                        </div>

                        <div className="list list-inline mb-0 headerTabs">
                            <div className="list-inlist item">
                                <span>
                                    <CompareIcon />
                                    <span className="badge bg-success rounded-circle">4</span>
                                    Compare
                                </span>
                            </div>
                        </div>
                        <div className="list list-inline mb-0 headerTabs">
                            <div className="list-inlist item">
                                <span>
                                    <FavoriteBorderIcon />
                                    <span className="badge bg-success rounded-circle">4</span>
                                    Wishlist
                                </span>
                            </div>
                        </div>
                        <div className="list list-inline mb-0 headerTabs">
                            <div className="list-inlist item">
                                <span>
                                    <ShoppingCartOutlinedIcon />
                                    <span className="badge bg-success rounded-circle">4</span>
                                    Cart
                                </span>
                            </div>
                        </div>
                        <ul className="list list-inline mb-0 headerTabs">
                            <li className="list-inlist item">
                                <span  onClick={() => setIsOpenDropDown(!isOpenDropDown)}>
                                    <PermIdentityOutlinedIcon />
                                    Account
                                </span>

                                {
                                    isOpenDropDown!==false &&
                                    <ul className="dropdownMenu">
                                    <li><Button className="align-items-center"><PersonIcon />My Account</Button></li>
                                    <li><Button><MapIcon />Orders tracking</Button></li>
                                    <li><Button><DiscountIcon />My Vouchers</Button></li>
                                    <li><Button><FavoriteIcon />Wishlist</Button></li>
                                    <li><Button><SettingsIcon />Settings</Button></li>
                                    <li><Button><LogoutIcon />Sign Out</Button></li>
                                </ul>
                                }
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
      </header>
  );
}

export default Header;