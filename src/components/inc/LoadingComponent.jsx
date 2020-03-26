import React from 'react';
import { CircularProgress } from '@material-ui/core';

const LoadingComponent = ({ isLoading, children }) => {
  const styles = {
    spinner: {
      margin: 0,
    },
  };

  if (isLoading) {
    return (
      <div style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: "9999"
      }}>
        <CircularProgress style={styles.spinner} />
      </div>
    );
  }
  return children;
};

export default LoadingComponent;
