import { PUBLIC_URL } from "../../settings";
import axios from "axios";
import FirebaseSvc from '../../settings/FirebaseSvc';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const LOGIN_URL = PUBLIC_URL + "/api/auth/login/";
const AUTH_USER_URL = PUBLIC_URL + "/api/auth/user/";
const CHECK_EMAIL_URL = PUBLIC_URL + "/api/accounts/check/email-duplicate/";
const CHECK_PHONE_URL = PUBLIC_URL + "/api/accounts/check/phone/";
const CHECK_PHONE_CODE_URL =
  PUBLIC_URL + "/api/accounts/check/phone/verify-no/";
const SIGN_UP_URL = PUBLIC_URL + "/api/accounts/signup/";
const GET_USER_INFO_URL = PUBLIC_URL + "/api/accounts/user/";
const UPDATE_TOKEN_URL = PUBLIC_URL + "/api/accounts/push-token/";
const SEND_PUSH_URL = PUBLIC_URL + "/api/accounts/send/push/";
const NOTIFICATION_URL = PUBLIC_URL + "/api/accounts/notification/";
const STUDENT_PROFILE_URL = PUBLIC_URL + "/api/accounts/student/";
const TEACHER_PROFILE_URL = PUBLIC_URL + "/api/accounts/teacher/";
const LECTURE_IMAGE_URL = PUBLIC_URL + "/api/accounts/lecture_image/";
const APPLICATION_FORM_URL = PUBLIC_URL + "/api/accounts/application_form/";
const RESET_PASSWORD_URL = PUBLIC_URL + "/api/accounts/password/reset/";


export const sendPush = (to, message) => {
  return async (dispatch, getState) => {
    return await axios
      .post(SEND_PUSH_URL, {
        to, message
      })
      .then(res => {
        if (res.status === 200) {
          // FirebaseSvc.createAccount(signupData)
          // console.log(res.data);
          return res.data
        }
      });
  };
};


export const userSignUp = signupData => {
  return async (dispatch, getState) => {
    return await axios
      .post(SIGN_UP_URL, {
        signupData
      })
      .then(res => {
        if (res.status === 200) {
          FirebaseSvc.createAccount(signupData)
          // console.log(res.data);
          return res.data
        }
      });
  };
};



export const login = (email, password) => {
  return async (dispatch, getState) => {
    return await axios
      .post(LOGIN_URL, {
        email,
        password
        // username: email
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: "LOGIN_SUCCESSFUL",
            data: { user: res.data.user, token: res.data.token }
          });
          FirebaseSvc.login({ email, password })
        }
      });
  };
};



export const updatePushToken = (token) => {
  return async (dispatch, getState) => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('설정에서 알림설정을 허용해주세요');
      return;
    }
    let pushToken = await Notifications.getExpoPushTokenAsync();
    console.log('pushToken', pushToken)
    return await axios
      .post(
        UPDATE_TOKEN_URL,
        {
          pushToken: pushToken
        },
        {
          headers: {
            Authorization: `JWT ${[token]}`
          }
        }
      )
      .then(res => {
        if (res.status === 200) {

        }
      });
  };
};



export const isEmailDuplicate = email => {
  return async (dispatch, getState) => {
    return await axios.get(CHECK_EMAIL_URL + "?email=" + email).then(res => {
      if (res.status === 200) {
        return res.data.isDuplicate;
      }
    });
  };
};

export const getUserInfo = id => {
  return async (dispatch, getState) => {
    return await axios.get(GET_USER_INFO_URL + id + "/").then(res => {
      if (res.status === 200) {
        console.log(res.data)
        return res.data;
      }
    });
  };
};


export const getUserByToken = (token) => {
  console.log(token)
  return async (dispatch, getState) => {
    return await axios.get(AUTH_USER_URL, {
      headers: {
        Authorization: `JWT ${[token]}`
      }
    },
      {
        headers: {
          Authorization: `JWT ${[token]}`
        }
      }
    ).then(res => {
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: "AUTHENTICATED",
          data: {
            user: res.data,
            token
          }
        })
        return res.data;
      }
    })
      .catch(res => console.log(res.response.data))
  };
};



export const updateUserInfo = (user, token) => {
  console.log('token', token)
  return async (dispatch, getState) => {
    return await axios.put(GET_USER_INFO_URL + user.id + "/",
      {
        ...user
      },
      {
        headers: {
          Authorization: `JWT ${[token]}`
        }
      }
    ).then(res => {
      if (res.status === 200) {
        dispatch({
          type: "UPDATE_USER",
          data: {
            user: res.data
          }
        });
      }
    })
      .catch(res =>
        console.log(res.response.data))
  };
};

export const checkPhone = phone => {
  return async (dispatch, getState) => {
    return await axios
      .post(CHECK_PHONE_URL, {
        phone
      })
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
      });
  };
};

export const checkPhoneCode = (verify_phone_id, verification_code) => {
  return async (dispatch, getState) => {
    return await axios
      .post(CHECK_PHONE_CODE_URL, {
        verify_phone_id,
        verification_code
      })
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
      });
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: "LOGOUT_SUCCESSFUL"
    });
  };
};

// notification 알림 메시지

export const getNotification = (token) => {
  return async (dispatch, getState) => {
    return await axios.get(NOTIFICATION_URL, {
      headers: {
        Authorization: `JWT ${[token]}`
      }
    }).then(res => {
      if (res.status === 200) {
        return res.data;
      }
    });
  };
};


// student profile



export const getStudnetProfile = (student_profile_id) => {
  return async (dispatch, getState) => {
    return await axios.get(STUDENT_PROFILE_URL + student_profile_id + '/').then(res => {
      if (res.status === 200) {
        return res.data;
      }
    });
  };
};


export const updateStudnetProfile = (student_profile_id, profile, token) => {
  console.log(profile)
  return async (dispatch, getState) => {
    return await axios.put(STUDENT_PROFILE_URL + student_profile_id + '/',
      {
        ...profile
      },
      {
        headers: {
          Authorization: `JWT ${[token]}`
        }
      }
    ).then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
      .catch(err => console.log(err.response.data))
  };
};


// teacher profile

export const getTeacherProfile = (profile_id) => {
  return async (dispatch, getState) => {
    return await axios.get(TEACHER_PROFILE_URL + profile_id + '/').then(res => {
      if (res.status === 200) {
        return res.data;
      }
    });
  };
};

export const updateTeacherProfile = (profile_id, profile, token) => {
  return async (dispatch, getState) => {
    return await axios.put(TEACHER_PROFILE_URL + profile_id + '/',
      {
        ...profile
      },
      {
        headers: {
          Authorization: `JWT ${[token]}`
        }
      }
    ).then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
      .catch(err => console.log(err.response.data))
  };
};

export const updateLectureImage = (lecture_images, token) => {
  return async (dispatch, getState) => {
    return await axios.post(LECTURE_IMAGE_URL,
      {
        lecture_images
      },
      {
        headers: {
          Authorization: `JWT ${[token]}`
        }
      }
    ).then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
      .catch(err => console.log(err.response.data))
  };
};


export const create_application = (applicationForm, token) => {
  return async (dispatch, getState) => {
    return await axios.post(APPLICATION_FORM_URL,
      {
        ...applicationForm
      },
      {
        headers: {
          Authorization: `JWT ${[token]}`
        }
      }
    ).then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }
    })
      .catch(err => console.log(err.response.data))
  };
};


export const reset_password = (email) => {
  return async (dispatch, getState) => {
    return await axios.post(RESET_PASSWORD_URL,
      {
        email
      }
    ).then(res => {
      if (res.status === 200 || res.status === 201) {
        return res.data;
      }
    })
      .catch(err => console.log(err.response.data))
  };
};

