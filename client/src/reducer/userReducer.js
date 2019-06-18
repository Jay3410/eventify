const initState = {
  isAuthanticate: false,
  user: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        isAuthanticate: !!action.payload,
        user: action.payload
      };
    default:
      return state;
  }
};
