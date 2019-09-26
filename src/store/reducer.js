export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const SIDE_EFFECT = 'SIDE_EFFECT';

import users from 'src/data/users';

console.log(users);

const initialState = {
  users: {
    email: '',
    password: ''
  }
};

const defaultAction = {};

const reducer = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE: {
      return {
        ...state, 
        email: action.email,
        password: action.password         
      }
    }
    
    case MATCH_EXISTING_USER: {
      return 
        console.log("cet utilisateur existe");
    }

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
