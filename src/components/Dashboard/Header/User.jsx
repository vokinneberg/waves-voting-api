import React from 'react';
import { Link } from 'react-router-dom';

const User = (props) => {
  const { user } = props;
  return (
    <div className="k-header__topbar-item k-header__topbar-item--user">
      <div className="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
        <img alt="Pic" src={user.avatarUrl} />
      </div>
      <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-md">
        <div className="k-user-card k-user-card--skin-light k-margin-b-50 k-margin-b-20-tablet-and-mobile">
          <div className="k-user-card__wrapper">
            <div className="k-user-card__pic">
              <img alt="Pic" src={user.avatarUrl} />
            </div>
            <div className="k-user-card__details">
              <div className="k-user-card__name">{user.name}</div>
              <div className="k-user-card__position">{user.description}</div>
            </div>
          </div>
        </div>
        <ul className="k-nav k-margin-b-10">
          <li className="k-nav__item">
            <Link to="/profile" className="k-nav__link">
              <span className="k-nav__link-icon"><i className="flaticon-profile" /></span>
              <span className="k-nav__link-text">My Profile</span>
            </Link>
          </li>
          <li className="k-nav__item k-nav__item--custom k-margin-t-15">
            <Link to="/signout" target="_blank" className="btn btn-outline-metal btn-hover-brand btn-upper btn-font-dark btn-sm btn-bold">Sign Out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
