/* eslint-disable react/prop-types */
import React from 'react';

const Notification = (props) => {
  const { notifications } = props;
  const notificationsList = notifications.map(notification => <NotificationListItem message={notification.message} time={notification.time} />);

  return (
    <div className="k-header__topbar-item dropdown">
      <div className="k-header__topbar-wrapper" data-toggle="dropdown" data-offset="20px 10px">
        <span className="k-header__topbar-icon"><i className="flaticon-alarm" /></span>
        <span className="k-badge k-badge--danger">{notifications.lengh}</span>
      </div>
      <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl">
        <div className="k-head k-head--sm k-head--skin-light">
          <h3 className="k-head__title">User Notifications</h3>
        </div>
        {notificationsList}
      </div>
    </div>
  );
};

const NotificationListItem = (props) => {
  const { message, time } = props;
  return (
    <div className="k-notification k-margin-t-10 k-margin-b-10 k-scroll" data-scroll="true" data-height="270">
      <div className="k-notification__item-icon">
        <i className="flaticon-time-2" />
      </div>
      <div className="k-notification__item-details">
        <div className="k-notification__item-title">
          { message }
        </div>
        <div className="k-notification__item-time">
          { time }
        </div>
      </div>
    </div>
  );
};

export default Notification;
