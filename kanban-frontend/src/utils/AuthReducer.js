// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user_id,
        token_id: action.payload.token_id,
        loading: false,
        error: ""
      };

    case "SIGNOUT_USER": {
      return { user: null, token_id: null, loading: false, error: "" };
    }
    
    case "FETCH_ERROR": {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
};
