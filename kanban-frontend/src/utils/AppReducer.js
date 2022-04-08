// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user_id,
        token_id: action.payload.token_id,
        loading: false,
      };

    case "GET_DATA":
      return {
        ...state,
        data: [...action.payload],
        loading: false,
      };

    case "ADD_CARD": {
      let lists = state.data;
      lists = lists.map(function (list) {
        if (list._id === action.listId) {
          list.cards.unshift({ ...action.payload });
        }
        return list;
      });

      return {
        ...state,
        data: [...lists],
        loading: false,
      };
    }

    case "ADD_LIST":
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case "UPDATE_LIST_TITLE": {
      let lists = state.data;
      lists = lists.map(function (list) {
        if (list._id === action.payload.id) {
          list.title = action.payload.title;
        }
        return list;
      });

      return {
        ...state,
        data: [...lists],
        loading: false,
      };
    }

    case "DELETE_CARD": {
      let lists = state.data;

      lists = lists.map(function (list) {
        if (list._id === action.payload.listId) {
          list.cards = list.cards.filter(
            (card) => card._id !== action.payload.cardId
          );
        }

        return list;
      });

      return {
        ...state,
        data: [...lists],
        loading: false,
      };
    }

    case "DELETE_LIST": {
      let lists = state.data;
      lists = lists.filter((list) => list._id !== action.payload);

      return {
        ...state,
        data: [...lists],
        loading: false,
      };
    }

    case "DRAG_AND_DROP": {
      let lists = state.data;

      lists = lists.map(function (list) {
        if (list._id === action.payload.sourceListId) {
          list.cards = list.cards.filter(
            (card) => card._id !== action.payload.cardId
          );
        }

        if (list._id === action.payload.destinationListId) {
          list.cards.splice(
            action.payload.cardPosition,
            0,
            action.payload.card
          );
        }

        return list;
      });

      return {
        ...state,
        data: [...lists],
        loading: false,
      };
    }

    default:
      return state;
  }
};
