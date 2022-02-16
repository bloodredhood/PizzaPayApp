import React from "react";
import "../App.css"
import { getCommonState, getDiet, getDrinks, getVeganPizza } from "../appReducer";
import Table from "./Table";

const SlicedPizza = ({ state, dispatch }) => {

  return (
    <div className="infoSpace">
      {state.members.length === 0
        ? ""
        : <div>
          <div className="circle">{
            state.members.filter(member => member.eatsPizza === true).map(member => (
              <div className="diagonalSlicing"
                style={{ transform: `rotate(${360 / state.members.filter(member => member.eatsPizza === true).length * state.members.filter(member => member.eatsPizza === true).indexOf(member)}deg)` }} key={`${member.name}1`}></div>
            ))
          }</div>
          <div style={{display: "flex", justifyContent: "space-around", marginTop: "10px", marginBottom: "10px"}}>
            <div className="counterList">
              <div className="counterTitle">Total members</div>
              <div className="counterNumber">{state.members.length}</div>
            </div>
            <div className="counterList">
              <div className="counterTitle">Total pizza eaters</div>
              <div className="counterNumber">{state.members.filter(member => member.eatsPizza === true).length}</div>
            </div>
          </div>
          <div>
            <button onClick={() => {
              dispatch(state, getDiet(state.members.map(guest => guest.name).join(",").split(" ").join("%20")))
              dispatch(state, getDrinks(state.members.length))
            }} className="button" >Load world diet book</button>
            <div>
              {state.diet.length === 0
                ? ""
                : <div>
                  <p style={{ fontSize: "25px", fontWeight: 700 }}>Now we have info about vegans!!!</p>
                  <button onClick={() => {
                    dispatch(state, getCommonState(state.members, state.diet))
                    if (state.diet.filter(member => member.isVegan).length / state.members.length >= 0.51) {
                      let pizzaType = ""
                      let random = Math.random(0,1)
                      random < 0.5 ? pizzaType = "cheese" : pizzaType = "vegan"
                      dispatch(state, getVeganPizza(pizzaType, state.commonState.filter(member => member.isVegan === true && member.eatsPizza).length))
                    } else {
                      dispatch(state, getVeganPizza("meat", state.commonState.filter(member => member.isVegan === true && member.eatsPizza).length))
                    }
                  }} className="button" >Get table</button>
                  <div style={{ display: "flex", justifyContent: "center", fontSize: "25px" }}>
                    {state.commonState.length === 0
                      ? <p style={{fontSize: "15px"}}>When you click it the App dies for few seconds and then rise alive like phoenix ;)</p>
                      : <Table state={state} dispatch={dispatch} />
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SlicedPizza