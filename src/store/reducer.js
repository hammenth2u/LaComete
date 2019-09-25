export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const SIDE_EFFECT = 'SIDE_EFFECT';

const initialState = {
  greetingMessage: 'Bienvenue sur la comète'
};

const defaultAction = {};

const reducer = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE: {
      return {
        ...state,
        greetingMessage: action.value
      }
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
