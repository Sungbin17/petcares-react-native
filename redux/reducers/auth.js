import { AsyncStorage } from "react-native";
// import firebaseSvc from '../../settings/FirebaseSettings';

const initialState = {
  token: null,
  user: {
    pk: null,
    id: null,
    username: "",
    email: "",
    user_type: ""
  },
  isAuthenticated: false,
  firebaseUser: {},
  errors: {}
};

export default function auth(state = initialState, action) {
  switch (action.type) {

    case "UPDATE_USER":
      return {
        ...state,
        user: action.data.user
      }

    case "AUTHENTICATED":
      return {
        ...state,
        user: action.data.user,
        token:  action.data.token,
        isAuthenticated: true
      };

    case "LOGIN_SUCCESSFUL":
      AsyncStorage.setItem("userToken", action.data.token);
      return {
        ...state,
        user: action.data.user,
        token: action.data.token,
        isAuthenticated: true
      };

    case "LOGOUT_SUCCESSFUL":
      AsyncStorage.removeItem("userToken");
      return {
        ...state,
        // errors: action.data,
        token: null,
        user: initialState.user,
        isAuthenticated: false,
        firebaseUser: {}
      };

    default:
      return state;
  }
}
