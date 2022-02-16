import React from "react";
import { getCurrency, getGuests } from "../appReducer";
import "../App.css";
import SlicedPizza from "./SlicedPizza";
import { dispatch } from "../state";

const LoadButton = ({state}) => {

  return (
    <div className="app-wrapper">
      <button onClick={() => {
        dispatch(state, getGuests())
        dispatch(state, getCurrency())
      }} className="button">Load Pizza Slice</button>
      <div>
        <SlicedPizza state={state} dispatch={dispatch}/>
      </div>
    </div >
  )
}

export default LoadButton