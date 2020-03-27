import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import errorStyles from "assets/jss/material-kit-pro-react/views/componentsSections/notificationsStyles.jsx";
import { clearError } from "../../actions/error";
import {connect} from "react-redux";

const ErrorPanel = (props) => {
  return (
    <div>
      {props.error && props.error.errorMsg &&
      <div className="error-container">
        <SnackbarContent
          message={
            <span>
                  <b>ERROR:</b>
              {props.error.errorMsg}
                </span>
          }
          customNotificationClear={props.clearError}
          close
          color="danger"
          icon="info_outline"
        />
      </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  clearError: () => {dispatch(clearError())},
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(errorStyles)(ErrorPanel));