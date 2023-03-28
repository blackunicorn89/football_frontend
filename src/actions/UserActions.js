export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAILED = "EDIT_USER_FAILED";
export const REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
export const REMOVE_USER_FAILED = "REMOVE_USER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const CLEAR_STATE = "CLEAR_STATE";

// GET USERS
export const getUsers = () => {
  return async (dispatch) => {

    dispatch(loading());
    let response = await fetch("/api/users/getusers");

    dispatch(stopLoading());
    if (!response) {
      dispatch(fetchUsersFailed("There was an error with the connection. Fetching users failed."));
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(fetchUsersFailed("Failed to parse users' data."));
        return
      }
      dispatch(fetchUsersSuccess(data))
    } else {
      dispatch(fetchUsersFailed("Fetching users failed. Server responded with status " + response.status + " " + response.statusText));
    }
  }
};

export const register = (login, values) => {

  return async (dispatch) => {

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(values)
    }
    dispatch(loading());
    let response = await fetch("/api/users/signup", request)
    if (!response) {
      dispatch(registerFailed("There was an error with the server connection. Register failed."));
      return;
    }
    if (response.ok) {
      dispatch(registerSuccess());
      dispatch(getUsers());
    } else {
      if (response.status === 422) {
        dispatch(registerFailed("Sähköpostiosoite on jo käytössä"));
        dispatch()

      } else {
        dispatch(registerFailed("Register failed. Server responded with a status " + response.status + " " + response.statusText));
      }
    }
  }
};

// EDIT USER

export const editUser = (login, user) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(user)
    }
    dispatch(loading());
    let response = await fetch("/api/users/edituser/" + user.id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(editUserFailed("There was propblem with connection. Editing user failed"))
      return
    }
    if (response.ok) {
      let data = await response.json();
      dispatch(editUserSuccess(data));
      dispatch(getUsers());
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(editUserFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(editUserFailed("Editing user failed. Server responded with status " + response.status + " " + response.statusText));

      }
    }
  };
};

// REMOVE USER
export const removeUser = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    dispatch(loading());
    let response = await fetch("/api/users/removeuser/" + id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(removeUserFailed("There was an error with the connection. Removing user failed."))
      return;
    }
    if (response.ok) {
      dispatch(removeUserSuccess());
      dispatch(getUsers())
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(removeUserFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(removeUserFailed("Removing userf failed. Server responded with a status " + response.status + " " + response.statusText))
      }
    }
  };
};


export const login = (user) => {
  return async (dispatch) => {

    let request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }
    dispatch(loading());
    let response = await fetch("/api/users/login", request)
    if (!response) {
      dispatch(loginFailed("Failed to parse login information. Login failed."))
      return;
    }
    if (response.ok) {
      let data = await response.json();

      if (!data) {
        dispatch(loginFailed("Failed to parse login information. Login failed."));
        return
      }
      dispatch(loginSuccess(data));
      dispatch(getNews());
    } else {
      dispatch(loginFailed("Virheellinen sähköposti tai salasana"));

    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutSuccess())
    dispatch(getNews())
  }
}

// ACTION CREATORS

export const loading = () => {
  return {
    type: LOADING
  }
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
};

const fetchUsersSuccess = () => {
  return {
    type: FETCH_USERS_SUCCESS
  }
}

export const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    error: error
  }
}

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  }
}

export const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    error: error
  }
}

const editUserSuccess = () => {
  return {
    type: EDIT_USER_SUCCESS
  }
}

export const editUserFailed = (error) => {
  return {
    type: EDIT_USER_FAILED,
    error: error
  }
}

const removeUserSuccess = () => {
  return {
    type: REMOVE_USER_SUCCESS
  }
}

export const removeUserFailed = (error) => {
  return {
    type: REMOVE_USER_FAILED,
    error: error
  }
}

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    admin: data.admin
  }
};

const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE
  }
};