import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

// core components
import Table from "components/Table/Table.jsx";
import { connect } from "react-redux";
import Moment from "react-moment";
import Button from "components/CustomButtons/Button.jsx";

import { getAllProjectLists } from "../../actions/sprint";
import LoadingComponent from "components/inc/LoadingComponent.jsx";
import PageTitle from "components/inc/PageTitle.jsx";
import style from "assets/jss/material-kit-pro-react/views/componentsSections/contentAreas.jsx";
import { withRouter } from "react-router-dom";
import Close from "@material-ui/core/SvgIcon/SvgIcon";
import { getProjectList } from "../../actions/project";
import PropTypes from "prop-types";
import { getProjectListAPI } from "../../api/bidProjectApi";
import moment from "moment";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      isLoading: true
    };
  }
  componentWillMount() {
    this.onGetProjects();
  }
  onGetProjects = async () => {
    try {
      const response = await getProjectListAPI();
      console.log("this is response from API function", response);
      if (response && response.data) {
        this.setState({
          projectList: response.data,
          isLoading: false
        });
      }
    } catch (er) {
      if (er.response) {
        this.setState({
          message: er.response.data.errorMessage,
          isLoading: true
        });
      }
    }
  };

  render() {
    const { projectList, isLoading } = this.state;

    const newTableData = projectList.map((val, i) => {
      let newArr = [];
      newArr.push(i + 1);
      newArr.push(
        <Link 
          to={{
              pathname: `/mybid/projects/${val._id}/sprints`,
              state: {
                projectTitle: val.title
              }
          }}>
            {val.title}
        </Link>
      );
      newArr.push(val.owner);
      newArr.push(
        <Moment format="D MMM YYYY HH:MM:SS" withTitle>
          {val.createdAt}
        </Moment>
      );
      return newArr;
    });
    const { classes, sprintListData, isFetching, history } = this.props;

    return (
      <div>
        <PageTitle title={"Projects"} />
        <LoadingComponent isLoading={isLoading}>
          <Table
            striped={true}
            tableHead={["#", "Project Title", "Owner", "Last bid"]}
            tableData={newTableData}
            customCellClasses={[
              classes.textCenter,
              classes.textRight,
              classes.textRight,
              classes.textRight
            ]}
            customClassesForCells={[0, 4, 5]}
            customHeadCellClasses={[
              classes.textCenter,
              classes.textRight,
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

const mapStateToProps = state => ({
  isFetching: state.project.isFetching,
  projectListData: state.project.data
});

const mapDispatchToProps = dispatch => ({
  loadProjectLists: () => dispatch(getProjectList())
});

Projects.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Projects));
