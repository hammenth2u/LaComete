export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const SIDE_EFFECT = 'SIDE_EFFECT';

import users from 'src/data/users';

console.log(users);

const initialState = {

  connectedUser : '',
};

const defaultAction = {};

const reducer = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    /*case SOMETHING: {
      return {
        ...state, 
        //email: action.email,
        //password: action.password    
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
