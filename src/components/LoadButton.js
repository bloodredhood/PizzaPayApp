import React from "react";

const LoadButton = (props) => {

  //getFullInfo - function for changing button class=loading, get api info, push it to state
  //and render other components by state info
  return (
    <div className="app-wrapper">
      <button onClick={props.state.getFullInfo} className="button">Load</button>
    </div>
  )
}

export default LoadButton