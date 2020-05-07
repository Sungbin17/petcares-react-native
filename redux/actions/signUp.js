export const saveSignUpData = data => {
    console.log(data);
    return (dispatch, getState) => {
      dispatch({type: 'SAVE_SIGN_UP_DATA', data: data});
    };
  };
  