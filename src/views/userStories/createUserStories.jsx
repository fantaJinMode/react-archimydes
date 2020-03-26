import React from "react";
import {withRouter} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from "@material-ui/core/InputLabel";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Help from '@material-ui/icons/Help';

import LoadingComponent from "components/inc/LoadingComponent";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.jsx";
import { connect } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { saveUserStories, addSuccessCriteria, removeSuccessCriteria, clearSuccessCriteria, clearUserStoriesData, getUserStories, setUserStoriesData, moveUserStoryToAnotherSprint, deleteUserStory,getOneUserStories,updateUserStories } from "../../actions/userStories";
import _ from 'lodash-es';
import queryString from 'query-string';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {stateFromHTML} from 'draft-js-import-html';


import classNames from "classnames";
// @material-ui/core components

// core components
import Footer from "components/Footer/Footer.jsx";
// sections for this page
import NavigationBar from "components/inc/NavigationBar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";


import styles from "assets/jss/customStyle.jsx";
import "react-bootstrap-wizard/dist/react-wizard.scss";

class UserStories extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thirdtStep: "Third step here",
			criteriaData: [],
			userStoriesTitleOne: '',
			userStoriesTitleTwo: '',
			userStoriesTitleThree: '',
			userStoriesDescription: '',
			userStoriesTitleOneError: false,
			userStoriesTitleTwoError: false,
			userStoriesTitleThreeError: false,
			userStoriesDescriptionError: false,
			complexity: 'Low',
			storyAcceptanceText: '',
			addStory: "",
			storyId: "",
			editStory: "",
			projectId: "",
			sprintId: "",
			isLoading: false,
			editorState: EditorState.createEmpty(),
		};
		this.isValidated = this.isValidated.bind(this);
	}

	componentDidUpdate(prevProps) {
		// if(!_.isEqual(prevProps.successCriteriaData , this.props.successCriteriaData)) {
		// 	const criteriaData = this.props.successCriteriaData.map(
		// 		(val, i) => {
		// 			let newArr = [];
		// 			newArr.push(i+1);
		// 			newArr.push(val);
		// 			newArr.push(<div className="success-criteria-delete"><IconButton color="secondary" onClick={() => this.handleDeleteStoryAcceptance(i)} ><Close /></IconButton></div>);
		// 			return newArr;
		// 		});
		// 	this.setState({criteriaData})
		// }
	}

	componentWillMount () {
		// const {history} =this.props
		// this.setState({
		// 	addStory: history && history.location && history.location.state,
		// 	editStory: history && history.location && history.location.state,
		// 	storyId: history && history.location && history.location.storyId,
		// 	projectId: history && history.location && history.location.projectId,
		// 	sprintId: history && history.location && history.location.sprintId,
		// 	index: history && history.location && history.location.index,
		// })

	}
	componentDidMount() {
		// this.getOneUserStory()
	}

	getOneUserStory = async () =>{
		const {projectId, sprintId, storyId,editStory} = this.state
		if(editStory === "editStory"){
			const response = await this.props.getOneUserStories(projectId, sprintId, storyId)
			if(response && response.data){
				this.setState({
					userStoriesTitleOne: response.data.titleObject.role,
					userStoriesTitleTwo: response.data.titleObject.want,
					userStoriesTitleThree: response.data.titleObject.purpose,
					userStoriesDescription: response.data.description,
					complexity: response.data.complexity,
				})
				const updateStorySuccessCriteria = _.map(response && response.data && response.data.criteria || [], (val, i) => {
					this.props.addSuccessCriteria(val.text);
				});
			}
			const contentState = stateFromHTML(response.data.description);
			const editorState = EditorState.createWithContent(contentState);
			this.setState({editorState: editorState});
		}

	}

	backe = () =>{
		const { addStory, editStory} = this.state
		if(addStory === "addStory"){
			this.props.jumpToStep(3)
		}else if(editStory === "editStory"){
			this.props.jumpToStep(3)
			this.props.clearSuccessCriteria();
		}else {
			this.props.jumpToStep(1)
		}
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
		this.setState({ userStoriesDescription: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
	};

	onEditorStateBlur = (descText) => {
		if(!descText){
			this.setState({ userStoriesDescriptionError: true });
		}else{
			this.setState({ userStoriesDescriptionError: false });
		}
	}

	render() {
        const { editorState } = this.state;
        const { classes } = this.props;
		const complexity = [
			{
				value: 'Low',
				label: 'Low',
			},
			{
				value: 'Medium',
				label: 'Medium',
			},
			{
				value: 'High',
				label: 'High',
			},
        ];
        const type = [
			{
				value: '1',
				label: 'enhancement',
			},
			{
				value: '2',
				label: 'BugFix',
			},
			{
				value: '3',
				label: 'QA',
			},
		];

	
		const {editStory, index} = this.state;
		return (

            <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.mainContentSection}>
          <div>
				<PageTitle title={editStory === "editStory" ? "Update User Stories" : 'Create User Stories'} />
				<LoadingComponent isLoading={ this.state.isLoading }>
					<Grid container>
						<Grid item xs={12}>
							<div className="title form-label">
								<h3 className="form-label-text">{editStory === "editStory"  ? `Update User Story No. ${index}` : `Add User Story No. ${ this.props.userStoriesSavedData.length + 1 }`}</h3>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className="form-element">
								<div className="title form-label">
									<h3 className="form-label-text">Summary</h3>
								</div>
								<TextField
									id="regular"
									inputProps={{
										maxLength: 150,
										placeholder: "Customer"
									}}
									className="form-textfield"
									fullWidth={true}
									error={ this.state.userStoriesTitleOneError ? true : false }
									value={ this.state.userStoriesTitleOne }
									onChange={(e) => {
										this.handleUserStoriesTitleOne(e);
									}}
									onBlur={(e) => {
										this.handleUserStoriesTitleOneValidation(e);
									}}
								/>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className="form-element">
								<div className="title form-label">
									<h3 className="form-label-text">Description:</h3>
								</div>
								<Editor
									editorState={editorState}
									toolbarClassName="toolbarClassName"
									wrapperClassName={ this.state.userStoriesDescriptionError ? "editorWrapper editorRequiredError" : "editorWrapper" }
									editorClassName="editorClassName"
									onEditorStateChange={this.onEditorStateChange}
									onBlur={() => this.onEditorStateBlur(editorState.getCurrentContent().hasText())}
								/>
							</div>
						</Grid>
						<Grid item xs={12}>
							<div className="form-element form-select-element complexity-element">
								<FormControl className={basicsStyle.formControl}>
									<InputLabel htmlFor="complexity-helper">Complexity</InputLabel>
									<Select
										value={this.state.complexity}
										onChange={(e) => {
											this.handleUserStoriesComplexity(e);
										}}
										input={<Input name="age" id="complexity-helper" />}
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
							<div className="form-element complexity-element">
								<Help className="complexity-help"/>
							</div>
						</Grid>
					</Grid>
				</LoadingComponent>
				<div>
					<Button
						type="button"
						color="success"
						round
						size="sm"
						className="custom-stepwizard-cancel-btn"
						onClick={this.backe}
					>
						Back
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

	handleUserStoriesTitleOne = (event) => {
		this.setState({ userStoriesTitleOne: event.target.value });
	};

	handleUserStoriesTitleTwo = (event) => {
		this.setState({ userStoriesTitleTwo: event.target.value });
	};

	handleUserStoriesTitleThree = (event) => {
		this.setState({ userStoriesTitleThree: event.target.value });
	};

	handleUserStoriesTitleOneValidation = (event) => {
		if(!event.target.value){
			this.setState({ userStoriesTitleOneError: true });
		}else{
			this.setState({ userStoriesTitleOneError: false });
		}
	};

	handleUserStoriesTitleTwoValidation = (event) => {
		if(!event.target.value){
			this.setState({ userStoriesTitleTwoError: true });
		}else{
			this.setState({ userStoriesTitleTwoError: false });
		}
	};

	handleUserStoriesTitleThreeValidation = (event) => {
		if(!event.target.value){
			this.setState({ userStoriesTitleThreeError: true });
		}else{
			this.setState({ userStoriesTitleThreeError: false });
		}
	};

	handleUserStoriesComplexity = (event) => {
		this.setState({ complexity: event.target.value });
	};

	handleStoryAcceptanceCriteria = (event) => {
		this.setState({ storyAcceptanceText: event.target.value });
	};

	handleSubmitStoryAcceptance = (title) => {
		if(title != ''){
			this.props.addSuccessCriteria(title);
			this.setState({ storyAcceptanceText: ''});
		}
	}

	handleDeleteStoryAcceptance = (val) => {
		confirmAlert({
			title: 'Are you sure ?',
			message: 'Are you sure want to delete this success criteria?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => this.props.removeSuccessCriteria(val),
					className: 'remove-success-criteria'
				},
				{
					label: 'No',
					onClick: () => {},
				},
			]
		})
	};

	handleClearForm(){
		this.setState({
			userStoriesTitleOne: '',
			userStoriesTitleTwo: '',
			userStoriesTitleThree: '',
			userStoriesDescription: '',
			complexity: 'Low',
			editorState: EditorState.createEmpty(),
		});
		this.props.clearSuccessCriteria();
	}

	handleUserStoryValidation = async () =>{
		this.setState({isLoading: true})
		const {editStory,projectId, sprintId,storyId } = this.state
		if(!(this.state.userStoriesTitleOne)){
			this.setState({ userStoriesTitleOneError: true });
		}else{
			this.setState({ userStoriesTitleOneError: false });
		}

		if(!(this.state.userStoriesTitleTwo)){
			this.setState({ userStoriesTitleTwoError: true });
		}else{
			this.setState({ userStoriesTitleTwoError: false });
		}

		if(!(this.state.userStoriesTitleThree)){
			this.setState({ userStoriesTitleThreeError: true });
		}else{
			this.setState({ userStoriesTitleThreeError: false });
		}

		if(!(this.state.userStoriesDescription)){
			this.setState({ userStoriesDescriptionError: true });
		}else{
			this.setState({ userStoriesDescriptionError: false });
		}
		if(this.state.userStoriesTitleOne && this.state.userStoriesTitleTwo && this.state.userStoriesTitleThree && !this.state.userStoriesDescriptionError){
			const titleObject = {
				"role" : this.state.userStoriesTitleOne,
				"want": this.state.userStoriesTitleTwo,
				"purpose" : this.state.userStoriesTitleThree
			}
			const data = {
				'titleObject': titleObject,
				'description': this.state.userStoriesDescription,
				'complexity': this.state.complexity,
				'criteria':this.props.successCriteriaData,
			}
			if(editStory === "editStory"){
				const response = await this.props.updateUserStories(data,projectId, sprintId, storyId)
				if(response && response.data){
					this.setState({isLoading: false})
				}else {
					this.setState({isLoading: false})
				}
			}else {
				if(this.props.projectSavedData._id || this.props.sprintSavedData.project  && this.props.sprintSavedData._id){
					const response = await this.props.createNewUserStory(data, this.props.sprintSavedData.project || this.props.projectSavedData._id, this.props.sprintSavedData._id);
					if(response.success == true){
						this.handleClearForm();
						this.isValidated(true);
						this.setState({isLoading: false})
					}else{
						this.isValidated(true);
						this.setState({isLoading: false})
					}
				}
			}

		}
		this.isValidated(false);
	}

	isValidated(validationResponse) {
		return validationResponse;
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
	saveUserStories: (data, projectId, sprintId) => dispatch(saveUserStories(data, projectId, sprintId)),
	clearUserStoriesData: () => dispatch(clearUserStoriesData()),
	setUserStoriesData: (data) => dispatch(setUserStoriesData(data)),
	deleteUserStory:(projectId, sprintId, storyId)=>dispatch(deleteUserStory(projectId, sprintId, storyId)),
	getOneUserStories:(projectId, sprintId, storyId)=>dispatch(getOneUserStories(projectId, sprintId, storyId)),
	updateUserStories:(data,projectId, sprintId, storyId)=>dispatch(updateUserStories(data,projectId, sprintId, storyId)),
});

export default connect(mapStateToProps, mapDispatchToProps, null,  { withRef: true })(withStyles(style)(withRouter(UserStories)));