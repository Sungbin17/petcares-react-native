const initialState = {
  userType: "",
  email: "",
  password: "",
  name: "",
  phone: "",
  school: "",
  major: "",
  selectedLectureCategory: "",
  teacher_info1: "",
  lecture_title: "",
  coverImages: [],
  errors: {}
};

export default function signUp(state = initialState, action) {
  switch (action.type) {
    case "SAVE_SIGN_UP_DATA":
      // console.log({ ...state, ...action.data });
      return { ...state, ...action.data };

    default:
      return state;
  }
}
