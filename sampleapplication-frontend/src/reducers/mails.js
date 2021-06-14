import {
    CREATE_MAIL,
    RETRIEVE_MAILS,
    UPDATE_MAIL,
    DELETE_MAIL,
    DELETE_ALL_MAILS,
  } from "../actions/types";
  
  const initialState = [];
  
  function mailReducer(mails = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_MAIL:
        return [...mails, payload];
  
      case RETRIEVE_MAILS:
        return payload;
  
      case UPDATE_MAIL:
        return mails.map((mail) => {
          if (mail.id === payload.id) {
            return {
              ...mail,
              ...payload,
            };
          } else {
            return mail;
          }
        });
  
      case DELETE_MAIL:
        return mails.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_MAILS:
        return [];
  
      default:
        return mails;
    }
  };
  
  export default mailReducer;