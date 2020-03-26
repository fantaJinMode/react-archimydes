import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';

// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import {connect} from "react-redux";

import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { getUserStories } from "../../actions/userStories.js";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import styles from "assets/jss/customStyle.jsx";

const mapStateToProps = state => ({
    isFetching: state.userStories.isFetching,
    userStoriesListData: state.userStories.data,
  });
  
  const mapDispatchToProps = dispatch => ({
    loadUserStories: () => dispatch(getUserStories()),
  });

class UserStoriesList extends React.Component {

  componentDidMount() {
    this.props.loadUserStories().then(res => {
      if(!this.props.userStoriesListData.length) {
        this.context.router.history.push('user-story/create');
      }
    });
  }

  render() {
    const {classes, isFetching } = this.props;

    const userStoriesListData = [{
        createdBy: 2,
        summary: '1st story created by 2',
        description: 'dummy desc',
        type: 'enhancement',
        complexity: 'high',
        estimatedHrs: 1,
        cost: 100,
    }];

    const newTableData = userStoriesListData.map(
      (val, i) => {
        let newArr = [];
        const complexity = 
        newArr.push(i+1);
        newArr.push(val.summary);
        newArr.push(val.description);
        newArr.push(val.type);
        newArr.push(val.complexity);
        newArr.push(val.estimatedHrs);
        newArr.push(val.cost);
        
        return newArr;
      });

    return (
      <div>
        <PageTitle title="User Stories List" />
        <LoadingComponent isLoading={ isFetching }>
          <Table striped={true}
                 tableHead={[
                   "#",
                   "Summary",
                   "Description",
                   "Type",
                   "Complexity",
                   "Estimatation (hr)",
                   "Cost",
                 ]}
                 tableData={newTableData}
                 customCellClasses={[
                   classes.textCenter,
                   classes.textRight,
                   classes.textRight
                 ]}
                 customClassesForCells={[0, 4, 5]}
                 customHeadCellClasses={[
                   classes.textCenter,
                   classes.textRight,
                   classes.textRight
                 ]}
                 customHeadClassesForCells={[0, 4, 5]}
          />
        </LoadingComponent>
      </div>
    );
  }
}

UserStoriesList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(UserStoriesList));
