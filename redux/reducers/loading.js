const initialState = {
    loaded: true,
    type: '',
  };
  
  export default function loading(state = initialState, action) {
    switch (action.type) {
      case 'LOADING_COMPLETE':
        return {...state, loaded: true, type: action.data.type};
  
      case 'LOADING_INITIALIZE':
        return {...state, loaded: false, type: action.data.type};
  
      default:
        return state;
    }
  }
  