import React from 'react';

const Language = () => (
  <div className="k-header__topbar-item k-header__topbar-item--langs">
    <div className="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
      <span className="k-header__topbar-icon">
        <img className="" src="assets/media/flags/020-flag.svg" alt="" />
      </span>
    </div>
    <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
      <ul className="k-nav k-margin-t-10 k-margin-b-10">
        <li className="k-nav__item k-nav__item--active">
          <a href="#" className="k-nav__link">
            <span className="k-nav__link-icon"><img src="assets/media/flags/020-flag.svg" alt="" /></span>
            <span className="k-nav__link-text">English</span>
          </a>
        </li>
        <li className="k-nav__item">
          <a href="#" className="k-nav__link">
            <span className="k-nav__link-icon"><img src="assets/media/flags/016-spain.svg" alt="" /></span>
            <span className="k-nav__link-text">Russian</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Language;
