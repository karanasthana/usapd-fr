import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React from 'react';

export default class CustomLoader extends React.Component {
  //other logic
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: this.props.inline ? 'none' : '50vh' }}>
        <Loader type={this.props.type ? this.props.type : "Audio"} color={this.props.color || "#00BFFF"} height={80} width={80} />
      </div>
    );
  }
}