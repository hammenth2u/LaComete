export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const SIDE_EFFECT = 'SIDE_EFFECT';

const initialState = {

  connectedUser : '',
};

const defaultAction = {};

const reducer = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    /*case CHECK_LOGGED_IN: {
      return {
        ...state, 
        connectedUser: state.connectedUser  
      }
    }*/
    
    default: {
      return { ...state };
    }
  }
};

export default reducer;

export const updateInputValue = value => {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  };
};

export const sideEffect = () => ({ type: SIDE_EFFECT });