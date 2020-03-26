import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types';

// core components
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import {connect} from "react-redux";
import Footer from "components/Footer/Footer.jsx";

// sections for this page
import NavigationBar from "components/inc/NavigationBar.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";

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
    // this.props.loadUserStories().then(res => {
    //   if(!this.props.userStoriesListData.length) {
    //     this.context.router.history.push('user-story/create');
    //   }
    // });
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
        newArr.push(i+1);
        newArr.push(_.upperFirst(val.summary));
        newArr.push(val.description);
        newArr.push(_.upperFirst(val.type));
        newArr.push(_.upperFirst(val.complexity));
        newArr.push(val.estimatedHrs);
        newArr.push(val.cost);
        
        return newArr;
      });

    return (
        <div>
        <div style={styles.removePadding}>
          <NavigationBar />
        </div>
        <div className={classNames(classes.main)}>
          <div style={styles.projectListSection}>
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
            />
            </LoadingComponent>
            <Clearfix />
            <div className={classes.left} style={styles.marginTopBottom}>              
              <Link to="/user-story/create">
                <Button type="button" color="success" round>New User Story</Button>
              </Link>
              <Link to="/">
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

UserStoriesList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(UserStoriesList));
