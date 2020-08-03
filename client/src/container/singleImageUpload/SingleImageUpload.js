import React, { Component } from "react";
import axios from "axios";

class SingleImageUpload extends Component {
   state = {
      selectFile: null,
   };

   inputChangeHandler = (event) => {
      this.setState({ selectFile: event.target.files[0] });
   };

   formSubmitHandler = (event) => {
      event.preventDefault();
      const formData = new FormData();
      const selectedFile = this.state.selectFile;
      if (selectedFile) {
         formData.append("uploadImage", selectedFile, selectedFile.name);
         console.log(formData);
         axios
            .post("/api/image/upload-single-image", formData, {
               headers: {
                  accept: "application/json",
                  "Accept-Language": "en-US,en;q=0.8",
                  "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
               },
            })
            .then((response) => {
               console.log(response);
            })
            .catch((err) => console.log(err));
      }
   };

   render() {
      return (
         <div className="container mt-5">
            <h1>Image upload</h1>
            <p>You can upload only single image</p>
            <form onSubmit={(e) => this.formSubmitHandler(e)}>
               <div className="form-group">
                  <input
                     type="file"
                     name="image"
                     onChange={(e) => this.inputChangeHandler(e)}
                  />
               </div>
               <div className="form-group">
                  <button className="btn btn-info" type="submit">
                     Upload
                  </button>
               </div>
            </form>
         </div>
      );
   }
}

export default SingleImageUpload;
