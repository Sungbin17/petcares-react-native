const initialState = {
  user_id: null,
  chat_user: null,
  errors: {}
};

export default function teacher(state = initialState, action) {
  switch (action.type) {
    case "SET_TEACHER_ID":
      return {
        ...state,
        user_id: action.data.user_id,
        profile_id: action.data.profile_id
      };

    case "SET_CHAT_USER":
      return {
        ...state,
        chat_user: action.data.chat_user
      }

    default:
      return state;
  }
}
