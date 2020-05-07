export const loadingComplete = type => {
  return (dispatch, getState) => {
    dispatch({ type: "LOADING_COMPLETE", data: { type } });
  };
};

export const loadingInitialize = type => {
  return (dispatch, getState) => {
    dispatch({ type: "LOADING_INITIALIZE", data: { type } });
  };
};
