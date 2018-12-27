import React from 'react';
import { Link } from 'react-router-dom';

import footerBg from '../../../assets/img/footer-bg.jpg';

const Footer = () => (
  <div className="k-footer k-grid__item" style={{ backgroundImage: `url(${footerBg})` }} id="k_footer">
    <div className="k-container">
      <div className="k-footer__top">
        <div className="row">
          <div className="col-lg-4">
            <div className="k-footer__section">
              <h3 className="k-footer__title">About</h3>
              <div className="k-footer__about">
                We truly hope that our love and dedication to produce an incredibly powerful
                high level solution suits all your project needs.
                We will continue to deliver incredible enterprise ready solutions to serve you better.
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="k-footer__section">
              <h3 className="k-footer__title">Quick Links</h3>
              <div className="row">
                <div className="col">
                  <ul className="k-footer__nav">
                    <li><Link to="/privacy-policy" className="k-link">Pravicy Policy</Link></li>
                    <li><a href="#" className="k-link">Terms & Conditions</a></li>
                    <li><a href="#" className="k-link">Help Center</a></li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="k-footer__nav">
                    <li><a href="#" className="k-link">Community</a></li>
                    <li><a href="#" className="k-link">Documentation</a></li>
                    <li><a href="#" className="k-link">Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="k-footer__section">
              <h3 className="k-footer__title">Get In Touch</h3>
              <form action="#" className="k-footer__subscribe">
                <div className="k-input-icon k-input-icon--right">
                  <input type="text" className="form-control" placeholder="Subscribe..." />
                  <span className="k-input-icon__icon k-input-icon__icon--right">
                    <span><i className="la la-arrow-right" /></span>
                  </span>
                </div>
              </form>
              <div className="k-footer__social">
                <div className="k-footer__social-label">
                  Social links:
                </div>
                <ul className="k-footer__social-nav">
                  <li><a href="#"><i className="flaticon-facebook-logo-button" /></a></li>
                  <li><a href="#"><i className="flaticon-twitter-logo-button" /></a></li>
                  <li><a href="#"><i className="flaticon-instagram-logo" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="k-footer__bottom">
        <div className="k-footer__copyright">
          2018&nbsp;&copy;&nbsp;
          <a href="https://trustamust.com" target="_blank" className="k-link">Trustamust</a>
        </div>
        <div className="k-footer__menu">
          <a href="http://keenthemes.com/keen" target="_blank" className="k-link">About</a>
          <a href="http://keenthemes.com/keen" target="_blank" className="k-link">Team</a>
          <a href="http://keenthemes.com/keen" target="_blank" className="k-link">Contact</a>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
