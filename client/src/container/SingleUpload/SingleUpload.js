import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import * as action from "../../store/action/uploadAction";

class SingleUpload extends Component {
   state = {
      selectedFile: null,
   };

   inputChangeHandler = (event) => {
      this.setState({
         selectedFile: event.target.files[0],
      });
   };

   formSubmitHandler = (event) => {
      event.preventDefault();
      const data = new FormData();
      if (this.state.selectedFile) {
         data.append("profileImage", this.state.selectedFile, "image.jpg");
         axios
            .post("/api/upload/single", data, {
               headers: {
                  "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
               },
            })
            .then((response) => {
               if (200 === response.status) {
                  if (response.data.error) {
                     console.log(response.data.error);
                  } else {
                     // Success
                     let fileName = response.data;
                     console.log("fileName", fileName);
                  }
               }
            })
            .catch((error) => console.log(error));
      }
   };

   render() {
      return (
         <div className="container mt-5">
            <h1>Single Upload</h1>
            <p>You can upload just one file</p>
            <form onSubmit={(e) => this.formSubmitHandler(e)}>
               <div className="form-group">
                  <input
                     type="file"
                     onChange={(e) => this.inputChangeHandler(e)}
                  />
               </div>
               <div className="form-group">
                  <button type="submit" className="btn btn-info">
                     Upload
                  </button>
               </div>
            </form>
         </div>
      );
   }
}

const stateToProps = (state) => {
   return {};
};

const dispatchToProps = (dispatch) => {
   return {
      onUpload: (data) => dispatch(action.onSingleUpload(data)),
   };
};

export default connect(stateToProps, dispatchToProps)(SingleUpload);
