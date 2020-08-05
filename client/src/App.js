import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SingleUpload from "./container/SingleUpload/SingleUpload";

class App extends Component {
   render() {
      return (
         <Fragment>
            <SingleUpload />
         </Fragment>
      );
   }
}

export default App;
