import * as actionTypes from "../action/actionTypes";

const initState = {
   loading: false,
   errMsg: null,
};

const reducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.UPLOAD_START:
         return { loading: true };
      case actionTypes.UPLOAD_SUCCESS:
         return { loading: false };
      case actionTypes.UPLOAD_FAIL:
         return { loading: false, errMsg: action.err };
      default:
         return state;
   }
};

export default reducer;
