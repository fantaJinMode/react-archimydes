import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';

// core components
import Grid from '@material-ui/core/Grid';
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import {connect} from "react-redux";
import Footer from "components/Footer/Footer.jsx";

// sections for this page
import NavigationBar from "components/inc/NavigationBar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

import { getUserStories, approveUserStory, rejectUserStory } from "../../actions/userStories.js";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import styles from "assets/jss/customStyle.jsx";

const mapStateToProps = state => ({
  isFetching: state.userStories.isFetching,
  userStoriesListData: state.userStories.userStoriesList,
});

const mapDispatchToProps = dispatch => ({
  loadUserStories: () => dispatch(getUserStories()),
  approveUserStory: (userStory) => dispatch(approveUserStory(userStory)),
  rejectUserStory: (userStory) => dispatch(rejectUserStory(userStory)),
});

class UserStoriesDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.onApproveUserStory = this.onApproveUserStory.bind(this);
    this.onRejectUserStory = this.onRejectUserStory.bind(this);
  }

  componentDidMount() {
    const {
      userStoriesListData,
    } = this.props;
    if (_.isEmpty(userStoriesListData)) {
      this.props.loadUserStories().then(res => {
        if(!this.props.userStoriesListData.length) {
          this.context.router.history.push('user-story/create');
        }
      });
    }
  }

  onApproveUserStory(userStory) {
    const {
      approveUserStory,
    } = this.props;
    let modifiedData = userStory;
    modifiedData.approved = true;
    modifiedData.reject = false;
    approveUserStory(modifiedData);
  }

  onRejectUserStory(userStory) {
    const {
      approveUserStory,
    } = this.props;
    let modifiedData = userStory;
    modifiedData.approved = false;
    modifiedData.reject = true;
    approveUserStory(modifiedData);
  }

  render() {
    const {
      classes,
      match: {
        params,
      },
      userStoriesListData,
    } = this.props;

    if(_.isEmpty(userStoriesListData)) {
      return false;
    }

    const userStory = _.find(userStoriesListData, (item) => item.id == params.id);

    const {
        summary,
        description,
        type,
        complexity,
        estimatedHrs,
        cost,
    } = userStory;

    return (
        <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
            <PageTitle title="User Stories Details" />
            <div>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <span>Summary</span>:&nbsp;
                <span>{_.upperFirst(summary)} </span>
              </Grid>
              <Grid item xs={12}>
                <span>Description</span>:&nbsp;
                <span>{_.upperFirst(description)} </span>
              </Grid>
              <Grid item xs={12}>
                <span>Type</span>:&nbsp;
                <span>{_.upperFirst(type)} </span>
              </Grid>
              <Grid item xs={12}>
                <span>Complexity</span>:&nbsp;
                <span>{_.upperFirst(complexity)} </span>
              </Grid>
              <Grid item xs={12}>
                <span>Estimated Hours(hrs)</span>:&nbsp;
                <span>{estimatedHrs} </span>
              </Grid>
              <Grid item xs={12}>
                <span>Cost</span>:&nbsp;
                <span>{cost} </span>
              </Grid>
            </Grid>
          </div>
            <Clearfix />
            <div className={classes.left} style={styles.marginTopBottom}>              
              <Button type="button" color="success" onClick={() => this.onApproveUserStory(userStory)} round>Approved</Button>
              <Button type="button" color="danger" onClick={() => this.onRejectUserStory(userStory)} round>Reject</Button>
              <Link to="/user-story">
                <Button type="button" color="success" round>Back</Button>
              </Link>
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
}

UserStoriesDetails.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(UserStoriesDetails));
