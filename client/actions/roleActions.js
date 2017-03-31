import axios from 'axios';
import * as actions from './actionTypes';


export function getRolesSuccess(roles) {
  return { type: actions.GET_ROLES_SUCCESS, roles };
}

export function createRoleSuccess(roleCreated) {
  return { type: actions.CREATE_ROLES_SUCCESS, roleCreated };
}

export function getRoles() {
  return dispatch => axios.get('/roles').then((roles) => {
    dispatch(getRolesSuccess(roles.data.message));
  }).catch((error) => {
    throw (error);
  });
}

export function getAllRoles() {
  return dispatch => axios.get('/roles').then((roles) => {
    dispatch(getRolesSuccess(roles.data.message));
  }).catch((error) => {
    throw (error);
  });
}

export function createRole(role) {
  let requestObject = {
    method: 'post',
    url: '/roles',
    data: { category: role },
    headers: { 'x-access-token': localStorage.getItem('token') },
  };
  if (role.id !== '') {
    requestObject = Object.assign({}, requestObject, { method: 'put', url: `/roles?id=${role.id}` });
  }
  return dispatch => axios(requestObject).then((response) => {
    if (response.data.success) {
      dispatch(createRoleSuccess(response.data.message));
    } else {
      console.log(response.data);
    }
  }).catch((error) => {
    console.log(error.response);
    throw (error);
  });
}

export function editRole(role) {
  return { type: actions.SHOW_EDITABLE_ROLE, role };
}