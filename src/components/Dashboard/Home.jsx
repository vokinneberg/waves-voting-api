import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
} from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.home,
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: HOME_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  componentWillMount() {
    const projects = agent.Projects.all;
    this.props.onLoad(projects);
  }

  render() {
    const { projects, wallet } = this.props;
    return (
      <div className="k-grid__item k-grid__item--fluid k-grid k-grid--ver k-grid--stretch">
        <div className="k-container k-content-wrapper  k-grid k-grid--ver" id="k_content_wrapper">
          <div className="k-content	k-grid__item k-grid__item--fluid k-grid k-grid--hor" id="k_content">

            <div className="k-content__body	k-grid__item k-grid__item--fluid">
              <div className="row">

                <div className="col-lg-12 col-xl-8 order-lg-2 order-xl-1">
                  <div className="k-portlet k-portlet--height-fluid k-widget-17">
                    <div className="k-portlet__head">
                      <div className="k-portlet__head-label">
                        <h3 className="k-portlet__head-title">Challengers</h3>
                      </div>
                      <div className="k-portlet__head-toolbar">
                        <div className="k-portlet__head-toolbar-wrapper" />
                      </div>
                    </div>
                    <div className="k-portlet__body">
                      <div className="k-widget-17" />
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-xl-4 order-lg-2 order-xl-1">
                  <div className="k-portlet k-portlet--height-fluid">
                    <div className="k-portlet__head">
                      <div className="k-portlet__head-label">
                        <h3 className="k-portlet__head-title">Wallet</h3>
                      </div>
                      <div className="k-portlet__head-toolbar">
                        <div className="k-portlet__head-toolbar-wrapper">
                          <FontAwesomeIcon icon="wallet" size="2x" />
                        </div>
                      </div>
                    </div>
                    <div className="k-portlet__body">
                      <div className="k-widget-6">
                        <div className="k-widget6__tab tab-content">
                          <div id="k_personal_income_quater_15be902eb7357a" className="tab-pane fade active show">
                            <div className="k-widget-6__items">
                              <div className="k-widget-6__item">
                                <div className="k-widget-6__item-pic">
                                  <img className="" src="../assets/media/blog/blog-7.jpg" alt="" />
                                </div>
                                <div className="k-widget-6__item-info">
                                  <div className="k-widget-6__item-title">
                                    Quickly direct you useful content or people
                                  </div>
                                  <div className="k-widget-6__item-desc">
                                    <div className="k-widget-21__data">
                                      <div className="k-widget-21__legends">
                                        <div className="k-widget-21__legend">
                                          <i className="k-bg-success"></i>
                                          <span>HTML</span>
                                        </div>
                                        <div className="k-widget-21__legend">
                                          <i className="k-bg-warning"></i>
                                          <span>CSS</span>
                                        </div>
                                        <div className="k-widget-21__legend">
                                          <i className="k-bg-brand"></i>
                                          <span>Angular</span>
                                        </div>
                                      </div>
                                      <div className="k-widget-21__chart">
                                        <div className="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
                                          <div className="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                            <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
                                          </div>
                                          <div className="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                              <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                                          </div>
                                        </div>
                                        <div className="k-widget-21__stat">+37%</div>
                                        <canvas id="k_widget_technologies_chart_2" style="height: 100px; width: 100px; display: block;" width="200" height="200" className="chartjs-render-monitor"></canvas>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="k-widget-6__item-icon k-widget-6__item-icon--brand">
                                  <div className="dropdown dropdown-inline" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="k-portlet__foot k-portlet__foot--md">
                      <div className="k-widget-17__foot">
                        <div className="k-widget-17__foot-info" />
                        <div className="k-widget-17__foot-toolbar">
                          <a href="#" className="btn btn-brand btn-sm btn-upper btn-bold"><FontAwesomeIcon icon="sync" /> Update</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
