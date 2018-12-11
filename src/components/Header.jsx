import React from 'react';

const Header = () => (
  <div id="k_header" class="k-header k-grid__item  k-header--fixed " data-kheader-minimize="on" style="background-image: url(assets/demo/demo3/media/layout/header-bg.jpg)">
    <div class="k-header__top">
      <div class="k-container">

        <div class="k-header__brand   k-grid__item" id="k_header_brand">
          <div class="k-header__brand-logo">
            <a href="index.html">
              <img alt="Logo" src="assets/media/logos/logo-7.png" class="k-header__brand-logo-default" />
              <img alt="Logo" src="assets/media/logos/logo-5.png" class="k-header__brand-logo-sticky" />
            </a>
          </div>
        </div>

        <div class="k-header__topbar">

          <div class="k-header__topbar-item k-header__topbar-item--search">
            <div class="k-input-icon k-input-icon--right">
              <input type="text" class="form-control" placeholder="Search..." />
              <span class="k-input-icon__icon k-input-icon__icon--right">
                <span><i class="la la-search"></i></span>
              </span>
            </div>
          </div>

          <div class="k-header__topbar-item dropdown">
            <div class="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
              <span class="k-header__topbar-icon"><i class="flaticon-layers"></i></span>
            </div>
            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl">
              <div class="k-head k-head--sm k-head--skin-light">
                <h3 class="k-head__title">Quick Actions</h3>
              </div>
              <div class="k-grid-nav">
                <a href="#" class="k-grid-nav__item">
                  <div class="k-grid-nav__item-icon"><i class="flaticon-computer"></i></div>
                  <div class="k-grid-nav__item-title">Customers</div>
                  <div class="k-grid-nav__item-desc">per department</div>
                </a>
                <a href="#" class="k-grid-nav__item">
                  <div class="k-grid-nav__item-icon"><i class="flaticon-business"></i></div>
                  <div class="k-grid-nav__item-title">Orders</div>
                  <div class="k-grid-nav__item-desc">latest orders</div>
                </a>
                <a href="#" class="k-grid-nav__item">
                  <div class="k-grid-nav__item-icon"><i class="flaticon-line-graph"></i></div>
                  <div class="k-grid-nav__item-title">Reports</div>
                  <div class="k-grid-nav__item-desc">finance & accounting</div>
                </a>
                <a href="#" class="k-grid-nav__item">
                  <div class="k-grid-nav__item-icon"><i class="flaticon-settings"></i></div>
                  <div class="k-grid-nav__item-title">Administration</div>
                  <div class="k-grid-nav__item-desc">settings and logs</div>
                </a>
              </div>
            </div>
          </div>

          <div class="k-header__topbar-item" data-toggle="k-tooltip" title="Quick panel" data-placement="top">
            <div class="k-header__topbar-wrapper">
              <span class="k-header__topbar-icon" id="k_quick_panel_toggler_btn"><i class="flaticon-grid-menu"></i></span>
            </div>
          </div>

          <div class="k-header__topbar-item dropdown">
            <div class="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
              <span class="k-header__topbar-icon"><i class="flaticon-alarm"></i></span>
              <span class="k-badge k-badge--danger">3</span>
            </div>
            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl">
              <div class="k-head k-head--sm k-head--skin-light">
                <h3 class="k-head__title">User Notifications</h3>
              </div>
              <div class="k-notification k-margin-t-10 k-margin-b-10 k-scroll" data-scroll="true" data-height="270">
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-time-2"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New order has been received
                    </div>
                    <div class="k-notification__item-time">
                      2 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-upload-1"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New customer is registered
                    </div>
                    <div class="k-notification__item-time">
                      3 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-interface-8"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      Application has been approved
                    </div>
                    <div class="k-notification__item-time">
                      3 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-file"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New file has been uploaded
                    </div>
                    <div class="k-notification__item-time">
                      5 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-user"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New user feedback received
                    </div>
                    <div class="k-notification__item-time">
                      8 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-cogwheel"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      System reboot has been successfully completed
                    </div>
                    <div class="k-notification__item-time">
                      12 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-light"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New order has been placed
                    </div>
                    <div class="k-notification__item-time">
                      15 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item k-notification__item--read">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-interface-2"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      Company meeting canceled
                    </div>
                    <div class="k-notification__item-time">
                      19 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-diagram"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New report has been received
                    </div>
                    <div class="k-notification__item-time">
                      23 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-pie-chart"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      Finance report has been generated
                    </div>
                    <div class="k-notification__item-time">
                      25 hrs ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-speech-bubble-1"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New customer comment recieved
                    </div>
                    <div class="k-notification__item-time">
                      2 days ago
                    </div>
                  </div>
                </a>
                <a href="#" class="k-notification__item">
                  <div class="k-notification__item-icon">
                    <i class="flaticon-exclamation-2"></i>
                  </div>
                  <div class="k-notification__item-details">
                    <div class="k-notification__item-title">
                      New customer is registered
                    </div>
                    <div class="k-notification__item-time">
                      3 days ago
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div class="k-header__topbar-item k-header__topbar-item--langs">
            <div class="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
              <span class="k-header__topbar-icon">
                <img class="" src="assets/media/flags/020-flag.svg" alt="" />
              </span>
            </div>
            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim">
              <ul class="k-nav k-margin-t-10 k-margin-b-10">
                <li class="k-nav__item k-nav__item--active">
                  <a href="#" class="k-nav__link">
                    <span class="k-nav__link-icon"><img src="assets/media/flags/020-flag.svg" alt="" /></span>
                    <span class="k-nav__link-text">English</span>
                  </a>
                </li>
                <li class="k-nav__item">
                  <a href="#" class="k-nav__link">
                    <span class="k-nav__link-icon"><img src="assets/media/flags/016-spain.svg" alt="" /></span>
                    <span class="k-nav__link-text">Spanish</span>
                  </a>
                </li>
                <li class="k-nav__item">
                  <a href="#" class="k-nav__link">
                    <span class="k-nav__link-icon"><img src="assets/media/flags/017-germany.svg" alt="" /></span>
                    <span class="k-nav__link-text">German</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="k-header__topbar-item k-header__topbar-item--user">
            <div class="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
              <img alt="Pic" src="assets/media/users/300_21.jpg" />
            </div>
            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-md">
              <div class="k-user-card k-user-card--skin-light k-margin-b-50 k-margin-b-20-tablet-and-mobile">
                <div class="k-user-card__wrapper">
                  <div class="k-user-card__pic">
                    <img alt="Pic" src="assets/media/users/300_21.jpg" />
                  </div>
                  <div class="k-user-card__details">
                    <div class="k-user-card__name">Alex Stone</div>
                    <div class="k-user-card__position">CTO, Loop Inc.</div>
                  </div>
                </div>
              </div>
              <ul class="k-nav k-margin-b-10">
                <li class="k-nav__item">
                  <a href="custom/user/profile-v1.html" class="k-nav__link">
                    <span class="k-nav__link-icon"><i class="flaticon-profile"></i></span>
                    <span class="k-nav__link-text">My Profile</span>
                  </a>
                </li>
                <li class="k-nav__item">
                  <a href="custom/user/profile-v1.html" class="k-nav__link">
                    <span class="k-nav__link-icon"><i class="flaticon-signs"></i></span>
                    <span class="k-nav__link-text">Tasks</span>
                  </a>
                </li>
                <li class="k-nav__item">
                  <a href="custom/user/profile-v1.html" class="k-nav__link">
                    <span class="k-nav__link-icon"><i class="flaticon-mail-1"></i></span>
                    <span class="k-nav__link-text">Messages</span>
                  </a>
                </li>
                <li class="k-nav__item">
                  <a href="custom/user/profile-v1.html" class="k-nav__link">
                    <span class="k-nav__link-icon"><i class="flaticon-settings"></i></span>
                    <span class="k-nav__link-text">Settings</span>
                  </a>
                </li>
                <li class="k-nav__item k-nav__item--custom k-margin-t-15">
                  <a href="custom/user/login-v1.html" target="_blank" class="btn btn-outline-metal btn-hover-brand btn-upper btn-font-dark btn-sm btn-bold">Sign Out</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="k-header__bottom">
      <div class="k-container">

        <button class="k-header-menu-wrapper-close" id="k_header_menu_mobile_close_btn"><i class="la la-close"></i></button>
        <div class="k-header-menu-wrapper" id="k_header_menu_wrapper">
          <div id="k_header_menu" class="k-header-menu k-header-menu-mobile ">
            <ul class="k-menu__nav ">
              <li class="k-menu__item  k-menu__item--open k-menu__item--here k-menu__item--submenu k-menu__item--rel k-menu__item--open k-menu__item--here" data-kmenu-submenu-toggle="click" aria-haspopup="true"><a href="javascript:;" class="k-menu__link k-menu__toggle"><span class="k-menu__link-text">Dashboard</span><i class="k-menu__hor-arrow la la-angle-down"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--left">
                  <ul class="k-menu__subnav">
                    <li class="k-menu__item  k-menu__item--active " aria-haspopup="true"><a href="index.html" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Default Dashboard</span></a></li>
                    <li class="k-menu__item " aria-haspopup="true"><a href="dashboards/aside.html" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Aside Dashboard</span></a></li>
                    <li class="k-menu__item " aria-haspopup="true"><a href="dashboards/fluid.html" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Fluid Dashboard</span></a></li>
                  </ul>
                </div>
              </li>
              <li class="k-menu__item  k-menu__item--submenu k-menu__item--rel" data-kmenu-submenu-toggle="click" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><span class="k-menu__link-text">Pages</span><i class="k-menu__hor-arrow la la-angle-down"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--left">
                  <ul class="k-menu__subnav">
                    <li class="k-menu__item " aria-haspopup="true"><a href="javascript:;" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Create New Post</span></a></li>
                    <li class="k-menu__item " aria-haspopup="true"><a href="javascript:;" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Generate Reports</span><span class="k-menu__link-badge"><span class="k-badge k-badge--success">2</span></span></a></li>
                    <li class="k-menu__item  k-menu__item--submenu" data-kmenu-submenu-toggle="hover" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Manage Orders</span><i class="k-menu__hor-arrow la la-angle-right"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                      <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--right">
                        <ul class="k-menu__subnav">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Latest Orders</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Pending Orders</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Processed Orders</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Delivery Reports</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Payments</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Customers</span></a></li>
                        </ul>
                      </div>
                    </li>
                    <li class="k-menu__item  k-menu__item--submenu" data-kmenu-submenu-toggle="hover" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Customer Feedbacks</span><i class="k-menu__hor-arrow la la-angle-right"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                      <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--right">
                        <ul class="k-menu__subnav">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Customer Feedbacks</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Supplier Feedbacks</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Reviewed Feedbacks</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Resolved Feedbacks</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Feedback Reports</span></a></li>
                        </ul>
                      </div>
                    </li>
                    <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Register Member</span></a></li>
                  </ul>
                </div>
              </li>
              <li class="k-menu__item  k-menu__item--submenu k-menu__item--rel" data-kmenu-submenu-toggle="click" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><span class="k-menu__link-text">Reports</span><i class="k-menu__hor-arrow la la-angle-down"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                <div class="k-menu__submenu  k-menu__submenu--fixed k-menu__submenu--left" style="width:1000px">
                  <div class="k-menu__subnav">
                    <ul class="k-menu__content">
                      <li class="k-menu__item ">
                        <h3 class="k-menu__heading k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Finance Reports</span><i class="k-menu__ver-arrow la la-angle-right"></i></h3>
                        <ul class="k-menu__inner">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-map"></i><span class="k-menu__link-text">Annual Reports</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-user"></i><span class="k-menu__link-text">HR Reports</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-clipboard"></i><span class="k-menu__link-text">IPO Reports</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-graphic-1"></i><span class="k-menu__link-text">Finance Margins</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-graphic-2"></i><span class="k-menu__link-text">Revenue Reports</span></a></li>
                        </ul>
                      </li>
                      <li class="k-menu__item ">
                        <h3 class="k-menu__heading k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Project Reports</span><i class="k-menu__ver-arrow la la-angle-right"></i></h3>
                        <ul class="k-menu__inner">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Coca Cola CRM</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Delta Airlines Booking Site</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Malibu Accounting</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Vineseed Website Rewamp</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Zircon Mobile App</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--line"><span></span></i><span class="k-menu__link-text">Mercury CMS</span></a></li>
                        </ul>
                      </li>
                      <li class="k-menu__item ">
                        <h3 class="k-menu__heading k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">HR Reports</span><i class="k-menu__ver-arrow la la-angle-right"></i></h3>
                        <ul class="k-menu__inner">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Staff Directory</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Client Directory</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Salary Reports</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Staff Payslips</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Corporate Expenses</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Project Expenses</span></a></li>
                        </ul>
                      </li>
                      <li class="k-menu__item ">
                        <h3 class="k-menu__heading k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Reporting Apps</span><i class="k-menu__ver-arrow la la-angle-right"></i></h3>
                        <ul class="k-menu__inner">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Report Adjusments</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Sources & Mediums</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Reporting Settings</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Conversions</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Report Flows</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><span class="k-menu__link-text">Audit & Logs</span></a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="k-menu__item  k-menu__item--submenu k-menu__item--rel" data-kmenu-submenu-toggle="click" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><span class="k-menu__link-text">Apps</span><i class="k-menu__hor-arrow la la-angle-down"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--left">
                  <ul class="k-menu__subnav">
                    <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">eCommerce</span></a></li>
                    <li class="k-menu__item  k-menu__item--submenu" data-kmenu-submenu-toggle="hover" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Audience</span><i class="k-menu__hor-arrow la la-angle-right"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                      <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--right">
                        <ul class="k-menu__subnav">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-users"></i><span class="k-menu__link-text">Active Users</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-interface-1"></i><span class="k-menu__link-text">User Explorer</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-lifebuoy"></i><span class="k-menu__link-text">Users Flows</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-graphic-1"></i><span class="k-menu__link-text">Market Segments</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-graphic"></i><span class="k-menu__link-text">User Reports</span></a></li>
                        </ul>
                      </div>
                    </li>
                    <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Marketing</span></a></li>
                    <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Campaigns</span><span class="k-menu__link-badge"><span class="k-badge k-badge--success">3</span></span></a></li>
                    <li class="k-menu__item  k-menu__item--submenu" data-kmenu-submenu-toggle="hover" aria-haspopup="true"><a href="#" class="k-menu__link k-menu__toggle"><i class="k-menu__link-bullet k-menu__link-bullet--dot"><span></span></i><span class="k-menu__link-text">Cloud Manager</span><i class="k-menu__hor-arrow la la-angle-right"></i><i class="k-menu__ver-arrow la la-angle-right"></i></a>
                      <div class="k-menu__submenu k-menu__submenu--classic k-menu__submenu--right">
                        <ul class="k-menu__subnav">
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-add"></i><span class="k-menu__link-text">File Upload</span><span class="k-menu__link-badge"><span class="k-badge k-badge--danger">3</span></span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-signs-1"></i><span class="k-menu__link-text">File Attributes</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-folder"></i><span class="k-menu__link-text">Folders</span></a></li>
                          <li class="k-menu__item " aria-haspopup="true"><a href="#" class="k-menu__link "><i class="k-menu__link-icon flaticon-cogwheel-2"></i><span class="k-menu__link-text">System Settings</span></a></li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="k-header-toolbar">
            <a href="#" class="btn btn-wide btn-bold btn-pill btn-danger btn-upper">Purchase</a>
          </div>
        </div>

      </div>
    </div>
  </div>
);

export default Header;
