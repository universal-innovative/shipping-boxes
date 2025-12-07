import * as ACTION from "./action.js";

export const initialState = {
  boxes: [],
  loading: false,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTION.LOAD_START:
      return { ...state, loading: true, error: null };
    case ACTION.LOAD_SUCCESS:
      return { ...state, loading: false, boxes: action.boxes };
    case ACTION.LOAD_ERROR:
      return { ...state, loading: false, error: action.error };
    case ACTION.ADD_SUCCESS:
      return { ...state, boxes: [action.box, ...state.boxes] };
    default:
      return state;
  }
}
