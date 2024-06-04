import React from "react";
import "./header.css";
import Logo from "../../assets/images/ecommerceBrandLogo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import Select from "../selectDrop/select"

const Header = () => {
  return (
      <header>
        <div className="container-fluid">
            <div className="row">
                {/* Logo */}
                <div className="col-sm-2">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>

                {/* header search starts here */}
                <div className="col-sm-6">
                    <div className="headerSearch d-flex align-item-center">
                        <div className="selectDrop cursor">
                            All Catagories
                            <Select />
                        </div>

                        <div className="searchBox">
                            <input type="text" placeholder="Search for fresh fruits or vegetables" />
                            <SearchIcon className="searchIcon cursor" />
                        </div>
                    </div>
                </div>
                {/* header search ends here */}
            </div>
        </div>
      </header>
  );
}

export default Header;