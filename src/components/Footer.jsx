import React from 'react';

const Footer = () => (
  <div class="k-footer k-grid__item" style="background-image: url(assets/demo/demo3/media/layout/footer-bg.jpg)" id="k_footer">
    <div class="k-container">
      <div class="k-footer__top">
        <div class="row">
          <div class="col-lg-4">
            <div class="k-footer__section">
              <h3 class="k-footer__title">About</h3>
              <div class="k-footer__about">
                We truly hope that our love and dedication to produce an incredibly powerful
                high level solution suits all your project needs.
                We will continue to deliver incredible enterprise ready solutions to serve you better.
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="k-footer__section">
              <h3 class="k-footer__title">Quick Links</h3>
              <div class="row">
                <div class="col">
                  <ul class="k-footer__nav">
                    <li><a href="#" class="k-link">Pravicy Policy</a></li>
                    <li><a href="#" class="k-link">Terms & Conditions</a></li>
                    <li><a href="#" class="k-link">Help Center</a></li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="k-footer__nav">
                    <li><a href="#" class="k-link">Community</a></li>
                    <li><a href="#" class="k-link">Documentation</a></li>
                    <li><a href="#" class="k-link">Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="k-footer__section">
              <h3 class="k-footer__title">Get In Touch</h3>
              <form action="#" class="k-footer__subscribe">
                <div class="k-input-icon k-input-icon--right">
                  <input type="text" class="form-control" placeholder="Subscribe..." />
                  <span class="k-input-icon__icon k-input-icon__icon--right">
                    <span><i class="la la-arrow-right"></i></span>
                  </span>
                </div>
              </form>
              <div class="k-footer__social">
                <div class="k-footer__social-label">
                  Social links:
                </div>
                <ul class="k-footer__social-nav">
                  <li><a href="#"><i class="flaticon-facebook-logo-button"></i></a></li>
                  <li><a href="#"><i class="flaticon-twitter-logo-button"></i></a></li>
                  <li><a href="#"><i class="flaticon-instagram-logo"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="k-footer__bottom">
        <div class="k-footer__copyright">
          2018&nbsp;&copy;&nbsp;<a href="http://keenthemes.com/keen" target="_blank" class="k-link">Keenthemes</a>
        </div>
        <div class="k-footer__menu">
          <a href="http://keenthemes.com/keen" target="_blank" class="k-link">About</a>
          <a href="http://keenthemes.com/keen" target="_blank" class="k-link">Team</a>
          <a href="http://keenthemes.com/keen" target="_blank" class="k-link">Contact</a>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
