import axios from "axios";
import * as actionTypes from "./actionTypes";

const uploadStart = () => {
   return {
      type: actionTypes.UPLOAD_START,
   };
};

const uploadSuccess = () => {
   return {
      type: actionTypes.UPLOAD_SUCCESS,
   };
};

const uploadFail = (err) => {
   return {
      type: actionTypes.UPLOAD_FAIL,
      err: err,
   };
};

export const onSingleUpload = (imageData) => (dispatch) => {
   dispatch(uploadStart());
   const data = {};
   for (let [name, value] of imageData) {
   }
   axios.post("/api/upload/single", data);
};
