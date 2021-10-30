import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

// We create our HOC that takes a component and returns
// a new Spinner component that will show spinner animation
// when data is loading
const withSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
};

export default withSpinner;
