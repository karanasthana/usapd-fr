import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React from 'react';

export default class CustomLoader extends React.Component {
  //other logic
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader type="Bars" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}