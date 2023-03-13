import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { GrApps } from "react-icons/gr";
import { IoMdNotifications } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ onToggleSearchButton }) => {
  const [inputS, setInput] = useState("");

  return (
    <div className="header">
      <div className="header__left">
        <AiOutlineMenu />
        <Link to="/">
          <img
            className="header__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="header__center">
        <input type="text" onChange={(e) => setInput(e.target.value)} />

        <Link to={`/search`}>
          <AiOutlineSearch
            className="header__searchbutton"
            onClick={() => onToggleSearchButton(inputS)}
          />
        </Link>
      </div>

      <div className="header__right">
        <MdVideoCall className="header__icon" />
        <GrApps className="header__icon" />
        <IoMdNotifications className="header__icon" />
      </div>
    </div>
  );
};

export default Header;
