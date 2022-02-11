import React from "react";
import getData from "../api";


const LoadButton = ({ store }) => {

  let loadFirst = async() => {
    getData.guests()
    getData.currency()
  }

  let loadSecond = async() => {
    setTimeout(() => {
      getData.diet()
      console.log("1st timeout")
    }, 300)
    setTimeout(() => {
      getData.drinks()
      console.log("2nd timeout")
    }, 300)
  }

  let loadThird = async() => {
    setTimeout(() => {
      getData.veganPizza()
      console.log("3rd timeout")
    }, 2000)
  }

  return (
    <div className="app-wrapper">
      <button onClick={() => {
        loadFirst()
        loadSecond()
        loadThird()
      }} className="button">Load</button>
      {

      }
    </div>
  )
}

export default LoadButton