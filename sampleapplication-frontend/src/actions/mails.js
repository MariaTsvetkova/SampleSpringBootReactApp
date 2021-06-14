import {
    CREATE_MAIL,
    RETRIEVE_MAILS,
    UPDATE_MAIL,
    DELETE_MAIL,
    DELETE_ALL_MAILS
  } from "./types";
  
  import MailDataService from "../services/mails.service";
  
  export const createMail = (address, subject, message) => async (dispatch) => {
    try {
      const res = await MailDataService.create({ address, subject, message });
  
      dispatch({
        type: CREATE_MAIL,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveMails = () => async (dispatch) => {
    try {
      const res = await MailDataService.getAll();
  
      dispatch({
        type: RETRIEVE_MAILS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateMail = (id, data) => async (dispatch) => {
    try {
      const res = await MailDataService.update(id, data);
  
      dispatch({
        type: UPDATE_MAIL,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteMail = (id) => async (dispatch) => {
    try {
      await MailDataService.delete(id);
  
      dispatch({
        type: DELETE_MAIL,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllMails = () => async (dispatch) => {
    try {
      const res = await MailDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_MAILS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findMailsByAddress = (address) => async (dispatch) => {
    try {
      const res = await MailDataService.findByAddress(address);
  
      dispatch({
        type: RETRIEVE_MAILS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };