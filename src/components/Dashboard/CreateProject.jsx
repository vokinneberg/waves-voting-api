import React from 'react';
import { connect } from 'react-redux';


import agent from '../../agent';
import LargeInput from './Form/LargeInput';
import Textarea from './Form/Textarea';
import Submit from './Form/Submit';
import SecondaryButton from './Form/ScondaryButton';
import { CREATE_PROJECT } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch({ type: CREATE_PROJECT, payload }),
});

class CreateProject extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      tokensCount: 0,
      description: '',
    };
  }

  createProject = (e) => {
    e.preventDefault();
    const payload = agent.Projects.create({
      name: '',
      email: '',
      tokensCount: 0,
      description: '',
    });
    this.props.onSubmit(payload);
    this.setState({
      name: '',
      email: '',
      tokensCount: 0,
      description: '',
    });
  }

  setName = (ev) => {
    this.setState({ name: ev.target.value });
  }

  setEmail = (ev) => {
    this.setState({ email: ev.target.value });
  }

  setTokensCounter = (ev) => {
    this.setState({ tokensCount: ev.target.value });
  }

  setDescription = (ev) => {
    this.setState({ description: ev.target.value });
  }

  cancel = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const {
      name,
      email,
      tokensCount,
      description,
    } = this.state;

    return (
      <div className="k-grid__item k-grid__item--fluid k-grid k-grid--ver k-grid--stretch">
        <div className="k-container k-content-wrapper  k-grid k-grid--ver" id="k_content_wrapper">
          <div className="k-content	k-grid__item k-grid__item--fluid k-grid k-grid--hor" id="k_content">

            <div className="k-portlet">
              <div className="k-portlet__head">
                <div className="k-portlet__head-label">
                  <span className="k-portlet__head-icon">
                    <i className="flaticon2-rocket-1 k-label-font-color-2" />
                  </span>
                  <h3 className="k-portlet__head-title">Create project</h3>
                </div>
              </div>

              <form className="k-form" onSubmit={this.createProject}>
                <div className="k-portlet__body">
                  <div className="k-section k-section--first">
                    <h3 className="k-section__title">1. Project Info:</h3>
                    <div className="k-section__body">
                      <LargeInput id="pr_name" text="Project Name" value={name} type="text" helperText="Please enter your project name here" onChange={this.setName} />
                      <LargeInput id="pr_email" text="Project Email" value={email} type="email" helperText="Please enter your project email here" onChange={this.setEmail} />
                      <LargeInput id="pr_tokens_count" text="Tokens Count" value={tokensCount} type="text" helperText="Please enter your project tokens count" onChange={this.setTokensCounter} />
                      <Textarea id="pr_description" text="Project Description" value={description} rows="3" helperText="Please enter your project description" lastControl="true" onChange={this.setDescription} />
                    </div>
                  </div>
                </div>
                <div className="k-portlet__foot">
                  <div className="k-form__actions">
                    <div className="row">
                      <div className="col-lg-3" />
                      <div className="col-lg-6">
                        <Submit text="Submit" />
                        <SecondaryButton text="Cancel" onClick={this.cancel} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(CreateProject);
