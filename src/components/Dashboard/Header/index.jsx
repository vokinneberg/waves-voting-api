import React from 'react';
import { Link } from 'react-router-dom';

import Language from './Language';
import Notification from './Notification';
import User from './User';
import Menu from './Menu';

import headerBg from '../../../assets/img/header-bg.jpg';
import logo7 from '../../../assets/img/logo-7.png';
import logo5 from '../../../assets/img/logo-5.png';

const Header = () => (
  <div id="k_header" className="k-header k-grid__item  k-header--fixed " data-kheader-minimize="on" style={{ backgroundImage: `url(${headerBg})` }}>
    <div className="k-header__top">
      <div className="k-container">

        <div className="k-header__brand   k-grid__item" id="k_header_brand">
          <div className="k-header__brand-logo">
            <Link to="/">
              <img alt="Logo" src={logo7} className="k-header__brand-logo-default" />
              <img alt="Logo" src={logo5} className="k-header__brand-logo-sticky" />
            </Link>
          </div>
        </div>

        <div className="k-header__topbar">
          <Notification notifications={[]} />
          <Language />
          {/* <User /> */}
        </div>

      </div>
    </div>
    <Menu />
  </div>
);

export default Header;
