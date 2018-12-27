import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <div className="k-header__bottom">
    <div className="k-container">
      <button className="k-header-menu-wrapper-close" type="button" id="k_header_menu_mobile_close_btn"><i className="la la-close" /></button>
      <div className="k-header-menu-wrapper" id="k_header_menu_wrapper">
        <div className="k-header-toolbar">
          <Link to="/dashboard/create-project" className="btn btn-wide btn-bold btn-pill btn-danger btn-upper">Create project</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Menu;
