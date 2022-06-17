import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispath) => {
  try {
    const { data } = await api.signIn(formData);
    dispath({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispath) => {

  try {
    
    const { data } = await api.signUp(formData);
    
    dispath({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
