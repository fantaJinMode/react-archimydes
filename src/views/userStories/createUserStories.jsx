import React from "react";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import TextField from '@material-ui/core/TextField';

import LoadingComponent from "components/inc/LoadingComponent";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";
import { connect } from "react-redux";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { createUserStories } from "../../actions/userStories";

import classNames from "classnames";
// @material-ui/core components

// core components
import Footer from "components/Footer/Footer.jsx";
// sections for this page
import NavigationBar from "components/inc/NavigationBar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";


import styles from "assets/jss/customStyle.jsx";
import "react-bootstrap-wizard/dist/react-wizard.scss";
import {complexity, type} from  "../../utils/dataStore";


class UserStories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			criteriaData: [],
			formData: {
				summary: '',
				description: '',
				type: 1,
				complexity: 'Low',
				estimatedHrs: 0,
				cost: 0 
			},
			userStoriesSummaryError: false,
			userStoriesCostError: false,
			userStoriesEstimatedHrsError: false,
			isLoading: false,
		};
		this.isValidated = this.isValidated.bind(this);
	}

	componentDidUpdate(prevProps) {
	
	}

	componentDidMount() {
		// this.getOneUserStory()
	}

	render() {
        const { formData, editStory, userStoriesSummaryError, userStoriesCostError, userStoriesEstimatedHrsError, isLoading  } = this.state;
		const { classes } = this.props;
	
		return (
        <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
          <div style={classes.container}>
				<PageTitle title={editStory === "editStory" ? "Update User Stories" : 'Create User Stories'} />
				<LoadingComponent isLoading={ isLoading }>
					<Grid container>
						<Grid item xs={12}>
							<div className="form-element">
								<div className="title form-label">
									<h3 className="form-label-text">Summary</h3>
								</div>
								<TextField
									id="regular"
									name="summary"
									inputProps={{
										maxLength: 150,
									}}
									className="form-textfield"
									fullWidth={true}
									error={ userStoriesSummaryError ? true : false }
									value={ formData.summary }
									onChange={this.handleUserInput}
									onBlur={(e) => {
										this.handleUserStoriesSummaryValidation(e);
									}}
								/>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className="form-element">
								<div className="title form-label">
									<h3 className="form-label-text">Description:</h3>
								</div>
								<TextField
									id="regular"
									name="description"
									inputProps={{
										maxLength: 150,
									}}
									className="form-textfield"
									fullWidth={true}
									value={ formData.description }
									onChange={this.handleUserInput}
									multiline
									rows={5}
								/>
							</div>
						</Grid>
						<Grid style={{marginTop: 33}} item xs={12}>
							<div className="form-element">
								<FormControl className={basicsStyle.formControl}>
									<InputLabel htmlFor="complexity-helper">Complexity</InputLabel>
									<Select
										value={formData.complexity}
										onChange={this.handleUserInput}
										name="complexity"
									>
										{complexity.map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
									<FormHelperText>Please select complexity</FormHelperText>
								</FormControl>
							</div>
						</Grid>
						<Grid style={{marginTop: 33}} item xs={12}>
							<div className="form-element form-select-element complexity-element">
								<FormControl className={basicsStyle.formControl}>
									<InputLabel htmlFor="type">Type</InputLabel>
									<Select
										value={formData.type}
										onChange={this.handleUserInput}
										name="type"
									>
										{type.map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
									<FormHelperText>Please select Type</FormHelperText>
								</FormControl>
							</div>
						</Grid>

						<Grid item xs={12}>
							<div className="form-element">
								<div className="title form-label">
									<h3 className="form-label-text">Cost</h3>
								</div>
								<TextField
									id="regular"
									name="cost"
									inputProps={{
										maxLength: 150,
									}}
									type="number"
									className="form-textfield"
									fullWidth={true}
									error={ userStoriesCostError ? true : false }
									value={ formData.cost }
									onChange={this.handleUserInput}
									onBlur={(e) => {
										this.handleUserStoriesCostValidation(e);
									}}
								/>
							</div>
						</Grid>
						
						<Grid item xs={12}>
							<div className="form-element">
								<div className="title form-label">
									<h3 className="form-label-text">Estimated Hours</h3>
								</div>
								<TextField
									id="regular"
									name="estimatedHrs"
									inputProps={{
										maxLength: 10,
									}}
									type="number"
									className="form-textfield"
									fullWidth={true}
									error={ userStoriesEstimatedHrsError ? true : false }
									value={ formData.estimatedHrs }
									onChange={this.handleUserInput}
									onBlur={(e) => {
										this.handleUserStoriesEstimatedHourValidation(e);
									}}
								/>
							</div>
						</Grid>
					</Grid>
				</LoadingComponent>
				<div
					className={classes.center}
				>
					<Button
						type="button"
						color="success"
						round
						size="md"
						style={{marginTop:33}}
						disabled={!formData.summary || !formData.cost || !formData.estimatedHrs}
						onClick={this.handleUserStoryValidation}
					>
						Submit
					</Button>
				</div>
			</div>
          </div>
          <Clearfix />
        </div>
        <Footer
          theme="#e5e5e5"
          content={
            <div>
              <div className={classes.right}>
                A &copy;&nbsp;
                <a href="http://www.root-nyc.com">
                  Root NYC
                </a>
                &nbsp;Product
              </div>
            </div>
          }
        />
      </div>
			
		);
	}
	
	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
            formData:  {
                ...this.state.formData,
                [name]: value
            }
        });
	}

	handleUserStoriesSummaryValidation = (event) => {
		if(!event.target.value){
			this.setState({ userStoriesSummaryError: true });
		}else{
			this.setState({ userStoriesSummaryError: false });
		}
	};

	handleUserStoriesCostValidation = (event) => {
		if(!event.target.value){
			this.setState({ userStoriesCostError: true });
		}else{
			this.setState({ userStoriesCostError: false });
		}
	};
	
	handleUserStoriesEstimatedHourValidation = (event) => {
		if(!event.target.value){
			this.setState({ userStoriesEstimatedHrsError: true });
		}else{
			this.setState({ userStoriesEstimatedHrsError: false });
		}
	};

	handleUserStoryValidation = async () =>{
		this.setState({isLoading: true});
		const { formData } = this.state;
		const response = await this.props.createUserStories(formData);
		if(response.success === true){
			
		} else{
			
		}
	}

	isValidated() {
		const { userStoriesSummaryError, userStoriesCostError, userStoriesEstimatedHrsError } = this.state;
		return userStoriesSummaryError === true && userStoriesCostError === true && userStoriesEstimatedHrsError === true;
	}
}

const mapStateToProps = state => ({
	successCriteriaData: state.userStories.successCriteria,
	userStoriesSavedData: state.userStories.userStoriesSavedData,
	userStoriesList: state.userStories.userStoriesList,
	moveUserStoriesListResponse:state.userStories.moveUserStoriesListResponse,
	userStoryDeleteError:state.userStories.userStoryDeleteError,
	userStoriesUpdateData:state.userStories.userStoriesUpdateData,
});

const mapDispatchToProps = dispatch => ({
	createUserStories: (data, projectId, sprintId) => dispatch(createUserStories(data, projectId, sprintId)),
});

export default connect(mapStateToProps, mapDispatchToProps, null,  { withRef: true })(withStyles(style)(withRouter(UserStories)));