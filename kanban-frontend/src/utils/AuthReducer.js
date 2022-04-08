export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user_id,
        token_id: action.payload.token_id,
        loading: false,
      };

    case "SIGNOUT_USER": {
      return { user: null, token_id: null, loading: false };
    }

    default:
      return state;
  }
};
