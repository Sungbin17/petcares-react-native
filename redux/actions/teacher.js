import { PUBLIC_URL } from "../../settings";
import axios from "axios";

const TEACHER_LIST_URL = PUBLIC_URL + "/api/core/teacher/list/";
const TEACHER_DETAIL_URL = PUBLIC_URL + "/api/accounts/teacher/";

export const getTeacherList = () => {
  return async (dispatch, getState) => {
    return await axios.get(TEACHER_LIST_URL).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    });
  };
};

export const getTeacherDetail = id => {
  return async (dispatch, getState) => {
    return await axios
      .get(TEACHER_DETAIL_URL + id.toString() + "/")
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
      });
  };
};

export const setTeacherId = (user_id, profile_id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_TEACHER_ID",
      data: { user_id, profile_id }
    });
  };
};

export const setChatUser = (chat_user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_CHAT_USER",
      data: { chat_user }
    });
  };
};

