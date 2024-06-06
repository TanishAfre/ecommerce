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


const Header = () => {

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
                        <div className="list list-inline mb-0 headerTabs">
                            <div className="list-inlist item">
                                <span>
                                    <PermIdentityOutlinedIcon />
                                    Account
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </header>
  );
}

export default Header;